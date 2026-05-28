"use client"

import React from "react"

type Props = { children: React.ReactNode; label?: string }
type State = { error?: Error }

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {}

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", this.props.label || "", error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="h-full w-full p-4 overflow-auto bg-[#1a0f0f] text-[#ffd7d7] text-xs font-mono">
          <div className="font-semibold mb-2 text-[#ff9b9b]">
            ⚠ {this.props.label || "Component"} crashed
          </div>
          <div className="mb-2">{this.state.error.name}: {this.state.error.message}</div>
          <pre className="whitespace-pre-wrap opacity-70">
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
