import React from 'react';
import * as ReactIs from 'react-is';
import isComponentType from './is-component-type';
import Slide from '../components/slide';
import Markdown from '../components/markdown';
import Appear from '../components/appear';
import Stepper from '../components/stepper';

const noop = () => {};

export default (children, visitor) => {
  React.Children.forEach(children, childNode => {
    traverse(childNode, visitor);
  });
  return visitor;
};

const traverse = (node, visitor) => {
  visitor.enter?.call(visitor, node);
  if (ReactIs.isFragment(node)) {
    React.Children.forEach(node.props.children, childNode =>
      traverse(childNode, visitor)
    );
  } else if (isComponentType(node, Slide.name)) {
    visitor.enterSlide?.call(visitor, node);
    React.Children.forEach(node.props.children, childNode =>
      traverse(childNode, visitor)
    );
    visitor.exitSlide?.call(visitor, node);
  } else if (isComponentType(node, Markdown.name)) {
    if (Boolean(node.props.containsSlides)) {
      traverseMarkdownSlides(node, visitor);
    } else {
      visitor.visitMarkdownNotSlides?.call(visitor, node);
    }
  } else if (isComponentType(node, Appear.name)) {
    visitor.visitAppear?.call(visitor, node);
  } else if (isComponentType(node, Stepper.name)) {
    visitor.visitStepper?.call(vistor, node);
  } else if (ReactIs.isElement(node)) {
    visitor.visitUnrecognizedNode?.call(visitor, node);
    React.Children.forEach(node.props.children, childNode =>
      traverse(childNode, visitor)
    );
  } else {
    visitor.visitTextNode?.call(visitor, node);
  }
  visitor.exit?.call(visitor, node);
};

const traverseChildren = (node, visitor) => {};

const traverseMarkdownSlides = (node, visitor) => {
  const rawMarkdown = React.Children.only(node.props.children);
  const mdSlides = rawMarkdown.split(/\n\s*---\n/);
  for (const mdSlide of mdSlides) {
    const content = normalize(indentNormalizer(mdSlide));
    const contentWithoutNotes = removeNotes(content);
    const notes = isolateNotes(content);
    const key = ''; // TODO
    const slide = (
      <Slide key={key}>
        <Markdown>{contentWithoutNotes}</Markdown>
        <Notes>{notes}</Notes>
      </Slide>
    );
    traverse(slide, visitor);
  }
};
