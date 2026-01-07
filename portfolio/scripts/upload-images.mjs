#!/usr/bin/env node

/**
 * MDX 파일의 로컬 이미지를 GitHub에 업로드하고 URL로 변환하는 스크립트
 *
 * 사용법:
 *   npm run upload-images                    # 모든 MDX 파일 처리
 *   npm run upload-images -- --file blog/my-post.mdx  # 특정 파일만 처리
 *   npm run upload-images -- --dry-run       # 실제 업로드 없이 미리보기
 *
 * 환경변수:
 *   GITHUB_TOKEN - GitHub Personal Access Token (repo 권한 필요)
 */

import fs from 'fs/promises';
import path from 'path';
import { execSync } from 'child_process';

// 설정
const CONFIG = {
  owner: 'conewarrior',
  repo: 'siot',
  branch: 'images',  // 이미지 전용 브랜치
  uploadPath: 'uploads',  // GitHub 리포 내 이미지 저장 경로
  contentDir: path.resolve(process.cwd(), 'docs/content'),
  supportedExtensions: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
};

// 이미지 경로 패턴 (MDX/Markdown)
const IMAGE_PATTERNS = [
  // ![alt](./path/to/image.png) or ![alt](path/to/image.png)
  /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g,
  // <img src="./path/to/image.png" />
  /<img[^>]+src=["'](?!https?:\/\/)([^"']+)["'][^>]*\/?>/g,
];

class ImageUploader {
  constructor(options = {}) {
    this.dryRun = options.dryRun || false;
    this.token = process.env.GITHUB_TOKEN;
    this.uploadedImages = new Map(); // 중복 업로드 방지
  }

  async run(targetFile = null) {
    console.log('🖼️  이미지 업로드 스크립트 시작\n');

    if (!this.token && !this.dryRun) {
      console.error('❌ GITHUB_TOKEN 환경변수가 필요합니다.');
      console.log('\n토큰 생성 방법:');
      console.log('1. https://github.com/settings/tokens/new 접속');
      console.log('2. "repo" 권한 선택');
      console.log('3. 토큰 생성 후 환경변수 설정:');
      console.log('   export GITHUB_TOKEN="your_token_here"');
      process.exit(1);
    }

    // images 브랜치 확인/생성
    if (!this.dryRun) {
      await this.ensureImagesBranch();
    }

    // MDX 파일 찾기
    const mdxFiles = await this.findMdxFiles(targetFile);
    console.log(`📁 처리할 파일: ${mdxFiles.length}개\n`);

    let totalImages = 0;
    let uploadedCount = 0;

    for (const file of mdxFiles) {
      const result = await this.processFile(file);
      totalImages += result.found;
      uploadedCount += result.uploaded;
    }

    console.log('\n✅ 완료!');
    console.log(`   - 발견된 로컬 이미지: ${totalImages}개`);
    console.log(`   - 업로드된 이미지: ${uploadedCount}개`);

    if (this.dryRun) {
      console.log('\n💡 --dry-run 모드입니다. 실제 업로드하려면 플래그를 제거하세요.');
    }
  }

  async ensureImagesBranch() {
    try {
      // 원격에 images 브랜치가 있는지 확인
      const result = execSync(
        `git ls-remote --heads origin ${CONFIG.branch}`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }
      );

      if (!result.includes(CONFIG.branch)) {
        console.log(`📌 '${CONFIG.branch}' 브랜치 생성 중...`);

        // orphan 브랜치 생성 (히스토리 없음)
        execSync(`git checkout --orphan ${CONFIG.branch}`, { stdio: 'pipe' });
        execSync('git rm -rf .', { stdio: 'pipe' });
        execSync('echo "# Image Storage" > README.md', { stdio: 'pipe' });
        execSync('git add README.md', { stdio: 'pipe' });
        execSync('git commit -m "Initialize images branch"', { stdio: 'pipe' });
        execSync(`git push origin ${CONFIG.branch}`, { stdio: 'pipe' });
        execSync('git checkout main', { stdio: 'pipe' });

        console.log(`✅ '${CONFIG.branch}' 브랜치 생성 완료\n`);
      }
    } catch (error) {
      // 브랜치가 없는 경우 무시
    }
  }

  async findMdxFiles(targetFile) {
    if (targetFile) {
      const fullPath = path.resolve(CONFIG.contentDir, targetFile);
      return [fullPath];
    }

    const files = [];
    await this.walkDir(CONFIG.contentDir, files);
    return files.filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  }

  async walkDir(dir, files) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await this.walkDir(fullPath, files);
      } else {
        files.push(fullPath);
      }
    }
  }

  async processFile(filePath) {
    const relativePath = path.relative(CONFIG.contentDir, filePath);
    console.log(`📄 ${relativePath}`);

    let content = await fs.readFile(filePath, 'utf-8');
    const fileDir = path.dirname(filePath);

    let found = 0;
    let uploaded = 0;
    const replacements = [];

    // 마크다운 이미지 문법 찾기: ![alt](path)
    const mdImageRegex = /!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g;
    let match;

    while ((match = mdImageRegex.exec(content)) !== null) {
      const [fullMatch, alt, imagePath] = match;
      found++;

      // 이미지 파일 경로 확인
      const absoluteImagePath = this.resolveImagePath(imagePath, fileDir);

      if (!absoluteImagePath) {
        console.log(`   ⚠️  이미지 없음: ${imagePath}`);
        continue;
      }

      const ext = path.extname(absoluteImagePath).toLowerCase();
      if (!CONFIG.supportedExtensions.includes(ext)) {
        console.log(`   ⚠️  지원하지 않는 형식: ${ext}`);
        continue;
      }

      // 이미지 업로드 및 URL 가져오기
      const githubUrl = await this.uploadImage(absoluteImagePath);

      if (githubUrl) {
        uploaded++;
        replacements.push({
          original: fullMatch,
          replacement: `![${alt}](${githubUrl})`,
        });
        console.log(`   ✅ ${path.basename(imagePath)} → GitHub`);
      }
    }

    // JSX img 태그 찾기
    const jsxImageRegex = /<img([^>]*)src=["'](?!https?:\/\/)([^"']+)["']([^>]*)\/?>/g;

    while ((match = jsxImageRegex.exec(content)) !== null) {
      const [fullMatch, beforeSrc, imagePath, afterSrc] = match;
      found++;

      const absoluteImagePath = this.resolveImagePath(imagePath, fileDir);

      if (!absoluteImagePath) {
        console.log(`   ⚠️  이미지 없음: ${imagePath}`);
        continue;
      }

      const githubUrl = await this.uploadImage(absoluteImagePath);

      if (githubUrl) {
        uploaded++;
        replacements.push({
          original: fullMatch,
          replacement: `<img${beforeSrc}src="${githubUrl}"${afterSrc}/>`,
        });
        console.log(`   ✅ ${path.basename(imagePath)} → GitHub`);
      }
    }

    // 파일 내용 업데이트
    if (replacements.length > 0 && !this.dryRun) {
      for (const { original, replacement } of replacements) {
        content = content.replace(original, replacement);
      }
      await fs.writeFile(filePath, content, 'utf-8');
    }

    if (found === 0) {
      console.log('   (로컬 이미지 없음)');
    }

    return { found, uploaded };
  }

  resolveImagePath(imagePath, fileDir) {
    // 절대 경로로 변환
    let absolutePath;

    if (imagePath.startsWith('/')) {
      // /images/... -> public/images/...
      absolutePath = path.resolve(process.cwd(), 'public', imagePath.slice(1));
    } else if (imagePath.startsWith('./') || imagePath.startsWith('../')) {
      // 상대 경로
      absolutePath = path.resolve(fileDir, imagePath);
    } else {
      // 그냥 파일명
      absolutePath = path.resolve(fileDir, imagePath);
    }

    try {
      require('fs').accessSync(absolutePath);
      return absolutePath;
    } catch {
      return null;
    }
  }

  async uploadImage(imagePath) {
    // 이미 업로드한 이미지인지 확인
    if (this.uploadedImages.has(imagePath)) {
      return this.uploadedImages.get(imagePath);
    }

    const fileName = path.basename(imagePath);
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${fileName}`;
    const githubPath = `${CONFIG.uploadPath}/${uniqueName}`;

    if (this.dryRun) {
      const url = `https://cdn.jsdelivr.net/gh/${CONFIG.owner}/${CONFIG.repo}@${CONFIG.branch}/${githubPath}`;
      this.uploadedImages.set(imagePath, url);
      return url;
    }

    try {
      // 이미지 파일 읽기
      const imageBuffer = await fs.readFile(imagePath);
      const base64Content = imageBuffer.toString('base64');

      // GitHub API로 업로드
      const response = await fetch(
        `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${githubPath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          body: JSON.stringify({
            message: `Upload image: ${fileName}`,
            content: base64Content,
            branch: CONFIG.branch,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      const data = await response.json();
      const url = `https://cdn.jsdelivr.net/gh/${CONFIG.owner}/${CONFIG.repo}@${CONFIG.branch}/${githubPath}`;

      this.uploadedImages.set(imagePath, url);
      return url;
    } catch (error) {
      console.error(`   ❌ 업로드 실패: ${error.message}`);
      return null;
    }
  }
}

// CLI 실행
const args = process.argv.slice(2);
const options = {
  dryRun: args.includes('--dry-run'),
};

let targetFile = null;
const fileIndex = args.indexOf('--file');
if (fileIndex !== -1 && args[fileIndex + 1]) {
  targetFile = args[fileIndex + 1];
}

const uploader = new ImageUploader(options);
uploader.run(targetFile).catch(console.error);
