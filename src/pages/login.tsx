// import { useForm } from "react-hook-form";


// const Login = () => {
//   const { register, handleSubmit, formState: {isSubmitting,errors} } = useForm();
//   return (
//     <form
//       noValidate
//       onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
//     >
//       <label htmlFor="email">이메일</label>
//       <input
//         id="email"
//         type="email"
//         placeholder="이메일을 입력해주세요"
//         {...register("이메일", {
//           required: true,
//           pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: "이메일 형식으로 작성해 주세요.",
//           },
//         })}
//       ></input>
//       {errors.email && <span>{errors.email.message}</span>}
//       <label htmlFor="password">비밀번호</label>
//       <input
//         id="password"
//         type="password"
//         placeholder="비밀번호를 입력해주세요"
//         {...register("비밀번호")}
//       ></input>
//       <button type="submit" disabled={isSubmitting}></button>
//     </form>
//   );
// };

// export default Login;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">Hello, Tailwind CSS!</h1>
    </div>
  );
}