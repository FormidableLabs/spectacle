import React from 'react';
import * as ReactIs from 'react-is';
import isComponentType from './is-component-type';
import Slide from '../components/slide';
import Markdown from '../components/Markdown';
import Appear from '../components/appear';
import Stepper from '../components/stepper';

const noop = () => {};

const NULL_VISITOR = {
  enter: noop,
  exit: noop,
  enterSlide: noop,
  exitSlide: noop,
  visitMarkdownNotSlides: noop,
  visitAppear: noop,
  visitStepper: noop,
  visitUnrecognized: noop
};

export default (children, visitor) => {
  React.Children.forEach(children, childNode => {
    traverseDeckChild(childNode, visitor);
  });
  return visitor;
};

const traverseDeckChild = (node, visitor) => {
  const exit = visitor.enter?.call(visitor);
  if (ReactIs.isFragment(node)) {
    traverseChildren(node, visitor);
  } else if (isComponentType(node, Slide.name)) {
    visitor.enterSlide?.call(visitor, node);
    traverseChildren(node, visitor);
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
  } else {
    visitor.visitUnrecognized?.call(visitor, node);
    traverseChildren(node, visitor);
  }
  if (typeof exit === 'function') {
    exit(node);
  }
};

const traverseChildren = (node, visitor) => {
  React.Children.forEach(node.children, childNode =>
    traverse(childNode, visitor)
  );
};

const traverseMarkdownSlides = (node, visitor) => {
  const rawMarkdown = React.Children.only(node.children);
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
