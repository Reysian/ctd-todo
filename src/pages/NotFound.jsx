import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <p>
        Page not found
      </p>
      <Link to={'/'}>Go back home</Link>
    </div>
  );
}

export default NotFound;