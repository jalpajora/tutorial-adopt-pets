import React, { ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends React.Component {
  public state = {
    redirect: "",
    hasError: false
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
