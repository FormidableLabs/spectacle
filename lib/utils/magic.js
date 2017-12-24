'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChildren = updateChildren;
exports.buildStyleMap = buildStyleMap;
/* eslint-disable max-statements */
function wrapTextChildren(child, valMap, classes) {
  var frag = document.createDocumentFragment();
  child.textContent.split('').map(function (s) {
    var char = s;
    if (s.charCodeAt(0) === 10) {
      char = 'CR';
    }
    if (s.charCodeAt(0) === 32) {
      char = 'SP';
    }
    if (s.charCodeAt(0) === 39) {
      char = 'QT';
    }
    if (s.charCodeAt(0) === 34) {
      char = 'DQT';
    }
    updateMap(valMap, char);

    var elKey = char + '-' + valMap[char];

    if (char === 'CR') {
      var el = document.createElement('span');
      el.style.display = 'block';
      el.setAttribute('data-key', elKey);
      el.setAttribute('wrapped', true);
      el.className = classes;
      frag.appendChild(el);
    } else if (s === ' ') {
      var _el = document.createElement('span');
      _el.style.display = 'inline-block';
      _el.setAttribute('data-key', elKey);
      _el.setAttribute('wrapped', true);
      _el.className = classes;
      _el.innerHTML = '&nbsp;';
      frag.appendChild(_el);
    } else {
      var _el2 = document.createElement('span');
      _el2.style.display = 'inline-flex';
      _el2.setAttribute('data-key', elKey);
      _el2.setAttribute('wrapped', true);
      _el2.className = classes;
      _el2.innerText = s;
      frag.appendChild(_el2);
    }
  });
  return frag;
}

function updateMap(valMap, val) {
  if (val in valMap) {
    valMap[val] += 1;
  } else {
    valMap[val] = 0;
  }
}

function updateChildren(root) {
  var valMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Array.prototype.slice.call(root.childNodes, 0).map(function (child) {
    if (child.nodeType !== 3 && child.getAttribute('wrapped')) {
      return;
    }

    if (child.nodeType === 1) {
      if (child.parentNode.classList.contains('prism-code') && child.tagName === 'SPAN') {
        var replaced = wrapTextChildren(child, valMap, child.classList.value);
        child.replaceWith(replaced);
      }
      updateMap(valMap, child.nodeName);
      child.setAttribute('data-key', child.nodeName + '-' + valMap[child.nodeName]);
    }
    if (child.nodeType === 3) {
      var _replaced = wrapTextChildren(child, valMap);
      child.replaceWith(_replaced);
    }
    if (child.childNodes) {
      updateChildren(child, valMap);
    }
  });
}

function buildStyleMap(map, root, coords) {
  root.childNodes.forEach(function (child) {
    if (child.nodeType !== 3) {
      var rect = child.getBoundingClientRect();

      var x = rect.x;
      var y = rect.y;

      if (coords && !root.classList.contains('spectacle-content')) {
        x = rect.x - coords.x;
        y = rect.y - coords.y;
      }

      map[child.dataset.key] = {
        x: x,
        y: y,
        left: rect.top,
        top: rect.top,
        height: rect.height,
        width: rect.width
      };

      if (child.childNodes) {
        buildStyleMap(map, child, { x: x, y: y });
      }
    }
  });
}