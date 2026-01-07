# Claude Code 플러그인 마켓플레이스 만들기

Claude Code에서 스킬과 커맨드를 마켓플레이스로 배포하고, 다른 사용자가 `/plugin`에서 선택적으로 설치할 수 있게 만드는 방법을 정리했다.

## 배경

기존에 만들어둔 Claude Code용 스킬들(pdf, canvas-design, pptx 등)과 커맨드들을 다른 프로젝트에서 쉽게 설치할 수 있게 하고 싶었다. 단순히 파일을 복사하는 게 아니라, `/plugin` 명령어로 마켓플레이스에서 목록을 보고 원하는 것만 골라서 설치하는 방식으로.

## 플러그인 구조 이해하기

Claude Code 플러그인은 다음 구조를 따른다:

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      # 플러그인 메타데이터
├── commands/            # 슬래시 커맨드 (.md 파일들)
├── skills/              # 스킬 폴더
└── agents/              # 에이전트
```

**중요**: 커맨드 파일은 반드시 `commands/` 서브폴더 안에 있어야 한다. 스킬과 달리 루트에 .md 파일을 두면 인식이 안 된다.

## 마켓플레이스 구조

마켓플레이스는 여러 플러그인을 묶어서 제공하는 저장소다. 구조:

```
my-marketplace/
├── .claude-plugin/
│   └── marketplace.json    # 마켓플레이스 메타데이터
├── skills/
│   ├── pdf/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   └── SKILL.md
│   └── canvas-design/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       └── SKILL.md
└── commands/               # 커맨드 묶음 플러그인
    ├── .claude-plugin/
    │   └── plugin.json
    └── commands/
        ├── install-skill.md
        └── cheatsheet.md
```

## marketplace.json 작성

```json
{
  "name": "claude-toolkit-marketplace",
  "owner": {
    "name": "conewarrior"
  },
  "plugins": [
    {
      "name": "pdf",
      "source": "./skills/pdf",
      "description": "PDF manipulation toolkit",
      "version": "1.0.0"
    },
    {
      "name": "canvas-design",
      "source": "./skills/canvas-design",
      "description": "Create visual art and designs",
      "version": "1.0.0"
    },
    {
      "name": "toolkit-commands",
      "source": "./commands",
      "description": "Workflow commands collection",
      "version": "1.0.0"
    }
  ]
}
```

각 플러그인의 `source`는 마켓플레이스 루트 기준 상대 경로다.

## 개별 플러그인 plugin.json

각 스킬/커맨드 폴더에 `.claude-plugin/plugin.json` 필요:

```json
{
  "name": "pdf",
  "description": "PDF manipulation toolkit",
  "version": "1.0.0"
}
```

## 마켓플레이스 등록

### 로컬 테스트용

`~/.claude/settings.json`에 추가:

```json
{
  "extraKnownMarketplaces": {
    "claude-toolkit-marketplace": {
      "source": {
        "source": "directory",
        "path": "/Users/username/dev/claude-toolkit"
      }
    }
  }
}
```

### GitHub 배포용

```json
{
  "extraKnownMarketplaces": {
    "claude-toolkit-marketplace": {
      "source": {
        "source": "github",
        "repo": "username/repo-name"
      }
    }
  }
}
```

## 플러그인 설치하기

1. `/plugin` 명령 실행
2. **Discover** 탭에서 플러그인 목록 확인
3. 원하는 플러그인 선택 후 Enter

또는 CLI로:
```
/plugin install pdf@claude-toolkit-marketplace
/plugin install toolkit-commands@claude-toolkit-marketplace
```

## 커맨드 구조의 함정

처음에 `commands/` 폴더에 .md 파일들을 직접 넣었더니 플러그인으로 인식이 안 됐다. 플러그인 구조상 커맨드 파일은 `commands/` 서브폴더 안에 있어야 해서, 결과적으로 `commands/commands/` 구조가 됐다.

```
commands/                    # 이게 플러그인 폴더
├── .claude-plugin/
│   └── plugin.json
└── commands/               # 여기에 실제 커맨드 파일
    ├── install-skill.md
    └── publish-command.md
```

폴더명을 `toolkit-commands`로 바꾸면 더 자연스럽다:

```
toolkit-commands/
├── .claude-plugin/
│   └── plugin.json
└── commands/
    └── *.md
```

## publish 커맨드 수정

기존 `/publish-skill` 커맨드는 파일만 업로드하고 버전만 bump했다. 마켓플레이스에 제대로 등록되려면:

1. `.claude-plugin/plugin.json` 없으면 자동 생성
2. `marketplace.json`의 `plugins` 배열에 추가
3. 버전 관리

이렇게 수정해야 새 스킬을 publish하면 바로 마켓플레이스에서 보인다.

## 결론

Claude Code 플러그인 마켓플레이스를 만들면:

- `/plugin` → Discover 탭에서 플러그인 목록 확인
- 필요한 것만 선택적으로 설치
- GitHub에 올리면 어디서든 사용 가능
- 팀원들과 도구 공유 용이

다만 플러그인 구조(특히 `commands/` 서브폴더 필수)를 잘 지켜야 한다.
