# Next-Auth 기본 개념

1. **Provider**: 
   - `next-auth`는 다양한 인증 제공자(Provider)를 지원합니다. 예를 들어, Google, Facebook, GitHub 등의 OAuth 제공자와 이메일/비밀번호 기반 인증을 사용할 수 있습니다.
   - 각 Provider는 `next-auth` 설정 파일에서 구성할 수 있습니다.

2. **Session**:
   - 세션은 사용자가 로그인한 상태를 유지하는 데 사용됩니다. `next-auth`는 세션을 관리하고, 클라이언트와 서버 간에 세션 정보를 안전하게 전달합니다.
   - 세션 정보는 클라이언트 측에서 `useSession` 훅을 통해 접근할 수 있습니다.

3. **JWT (JSON Web Token)**:
   - `next-auth`는 기본적으로 JWT를 사용하여 세션을 관리합니다. JWT는 사용자의 인증 정보를 안전하게 인코딩하여 클라이언트와 서버 간에 전달합니다.
   - JWT는 서버리스 환경에서 특히 유용하며, 세션 저장소를 필요로 하지 않습니다.

4. **Callback**:
   - `next-auth`는 인증 과정에서 다양한 콜백을 제공합니다. 예를 들어, 사용자가 로그인할 때 추가적인 사용자 정보를 가져오거나, 세션을 커스터마이즈할 수 있습니다.
   - 콜백은 `next-auth` 설정 파일에서 정의할 수 있습니다.

5. **Database**:
   - `next-auth`는 데이터베이스와 통합하여 사용자 정보를 저장할 수 있습니다. 지원되는 데이터베이스로는 MySQL, PostgreSQL, MongoDB 등이 있습니다.
   - 데이터베이스를 사용하면 사용자 정보와 세션을 영구적으로 저장할 수 있습니다.

6. **API Routes**:
   - `next-auth`는 Next.js의 API Routes를 사용하여 인증 관련 엔드포인트를 제공합니다. 예를 들어, `/api/auth/signin`, `/api/auth/signout` 등의 엔드포인트가 자동으로 생성됩니다. 