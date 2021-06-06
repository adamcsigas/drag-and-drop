//we will use an OO approach

/*
The goal here is to be able to:
  access the template
  the form in the html file
  get access to the div (with id="app")
  render the template in that div
*/
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    //the host element where I want to render my element at the end
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    //rendering by import template
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
