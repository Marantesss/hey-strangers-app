import Progress from "@/features/quiz/components/Progress";
import Quiz from "@/features/quiz/components/Quiz";
import { NextPage } from "next";

const SignupPage: NextPage = () => {
  return (
    <main className="relative h-full flex flex-col justify-center items-center">
      <div className="w-full absolute top-2 right-2 flex justify-end">
        <Progress />
      </div>
      <Quiz />
    </main>
  );
}

export default SignupPage;
