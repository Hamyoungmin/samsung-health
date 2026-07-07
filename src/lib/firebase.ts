/**
 * Firebase 설정 파일
 *
 * 사용 방법:
 * 1. Firebase 콘솔(https://console.firebase.google.com)에서 프로젝트 생성
 * 2. 프로젝트 설정 > 일반 > 웹 앱 추가에서 firebaseConfig 값 복사
 * 3. 프로젝트 루트에 .env.local 파일 생성 후 아래 환경 변수 설정
 *
 * .env.local 예시:
 *   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
 *   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
 *
 * 4. npm install firebase 실행
 * 5. 아래 주석을 해제하고 사용
 */

// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);
// export default app;

export {};
