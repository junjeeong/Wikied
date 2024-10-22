import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isloggedIn: null,
  login: () => set(() => ({})),
}));

//유저 상태 관리 (로그인 관리)
//타입 설정
interface UserState {
  user: { name: string; email: string } | null; // 유저 정보
  isLoggedIn: boolean; // 로그인 여부
  login: (user: { name: string; email: string }) => void; // 로그인 함수
  logout: () => void; // 로그아웃 함수
}

//유즈스토어 생성 : 상태와 액션 구현
const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }), // 로그인 시 유저 정보 저장
  logout: () => set({ user: null, isLoggedIn: false }), // 로그아웃 시 유저 정보 초기화
}));

export default useUserStore;

//사용할 곳에 useUserStore 임포트 후 원하는 상태값 혹은 액션을 구조분해 하여 사용

//gpt 코드 한번더 보고
//공식 문서 공부
//주스탠드 미들웨어 알아보기

/*
주스탄스 대표 지문
액션 함수 간단히 알아보기

import create from "zustand";

// Zustand의 상태 관리 설정
const Store = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

function MyComponent() {
  const { count, increase } = Store(); // Zustand 상태를 구독

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
  */
