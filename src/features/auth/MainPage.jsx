import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const MainPage = () => {
  const user = useSelector(selectCurrentUser);
  // const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}` : "Welcome!";

  const content = (
    <section className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="justify-self-start absolute top-8 text-4xl">{welcome}</h1>

      <div className=" flex gap-16">
        <p className="  w-[120px] h-[120px] justify-center border-2 text-2xl mt-12">
          <Link
            className="flex items-center h-full w-full text-center justify-center"
            to="/blogs"
          >
            Blogs
          </Link>
        </p>

        <p className="  w-[120px] h-[120px] justify-center border-2 border-gray-400 text-gray-400 text-2xl mt-12">
          <Link
            className="flex items-center h-full w-full text-center justify-center cursor-default"
            // to="/blogs"
          >
            Projects
          </Link>
        </p>
      </div>
    </section>
  );
  return content;
};

export default MainPage;
