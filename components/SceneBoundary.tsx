"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = { failed: boolean };

/**
 * Wraps the WebGL hero scene. If mounting or rendering it throws for any
 * reason (context creation failure, driver quirk, etc.), we drop to the
 * static CSS composition instead of taking the whole page down with it.
 */
export default class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // Intentionally silent in production — the fallback below is the
    // recovery, and this isn't actionable for a site visitor.
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
