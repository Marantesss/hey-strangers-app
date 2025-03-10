import Progress from "@/features/user/components/Progress";
import Quiz from "@/features/user/components/Quiz";
import { NextPage } from "next";

const SignupPage: NextPage = () => {
  return (
    <main className="relative h-full flex flex-col justify-center items-center">
      <div className="w-full absolute top-8 right-0 flex justify-end">
        <Progress />
      </div>
      <Quiz />
    </main>
  );
}

export default SignupPage;
