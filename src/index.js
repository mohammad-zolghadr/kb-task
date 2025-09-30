import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='errorBoundary'>
          <h1>An error occurred</h1>
          <p>
            Unfortunately, an error has occurred in the application. Please
            reload the page.
          </p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      )
    }

    return this.props.children
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
