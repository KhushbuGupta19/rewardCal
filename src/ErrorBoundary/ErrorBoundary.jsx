import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
    render() {
      if (this.state.hasError) {
        return <h1 style={{textAlign:"center",marginTop:"50px"}}>Something went wrong.</h1>;
      }
      return this.props.children; 
    }
  }
  export default ErrorBoundary;