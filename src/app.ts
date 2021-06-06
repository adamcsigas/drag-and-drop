//we will use an OO approach

//autobind decorator
function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjustedDescriptor;
}

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
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    //the host element where I want to render my element at the end
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    //rendering by import template
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  //we need a listener
  @autobind
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const projectInput = new ProjectInput();
