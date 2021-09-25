import React from "react";
import BaseComponent from "../baseComponent";
import SectionComponent from "./dashboardComponent";

class Section extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <SectionComponent state={this.state} />;
  }
}

export default Section;
