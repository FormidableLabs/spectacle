import React from 'react';

export function wrapChildren(children, key) {
  if (!children) return null;
  return children.map((child, i) => {
    if (!child) return null;
    let newKey = key ? `${key}${child.key || i}` : child.key || i;
    let classProps = {
      ...child.props,
      'data-key': newKey,
    };
    if (typeof child !== 'object') {
      return addKeys(child.toString(), newKey);
    } else if (typeof child.props.children === 'string') {
      return React.cloneElement(
        child,
        classProps,
        addKeys(child.props.children.toString(), newKey)
      );
    } else {
      return React.cloneElement(
        child,
        classProps,
        wrapChildren(React.Children.toArray(child.props.children), newKey)
      );
    }
  });
}

export function addKeys(text, key) {
  let charCountMap = {};
  return text.split('').map((s, i2) => {
    let char = s;
    if (s.charCodeAt(0) === 10) {
      char = 'CR';
    }
    if (s.charCodeAt(0) === 32) {
      char = 'SP';
    }
    if (char in charCountMap) {
      charCountMap[char] += 1;
    } else {
      charCountMap[char] = 0;
    }

    let elKey = `${key}.${char}${charCountMap[char]}`;

    if (char === 'CR') {
      return <span style={{ display: 'block' }} data-key={elKey} key={elKey} />;
    }

    return s === ' ' ? (
      <span style={{ display: 'inline-block' }} data-key={elKey} key={elKey}>
        &nbsp;
      </span>
    ) : (
      <span style={{ display: 'inline-flex' }} data-key={elKey} key={elKey}>
        {s}
      </span>
    );
  });
}

export function buildStyleMap(map, root) {
  root.childNodes.forEach(child => {
    if (child.nodeType !== 3) {
      let rect = child.getBoundingClientRect();
      map[child.dataset.key] = {
        x: rect.x,
        y: rect.y,
        left: rect.top,
        top: rect.top,
        height: rect.height,
        width: rect.width,
      };
      if (child.childNodes) {
        buildStyleMap(map, child);
      }
    }
  });
}
