/* eslint-disable max-statements */
function wrapTextChildren(child, valMap) {
  const frag = document.createDocumentFragment();
  child.textContent.split('').map(s => {
    let char = s;
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

    const elKey = `${char}-${valMap[char]}`;

    if (char === 'CR') {
      const el = document.createElement('span');
      el.style.display = 'block';
      el.setAttribute('data-key', elKey);
      el.setAttribute('wrapped', true);
      frag.appendChild(el);
    } else if (s === ' ') {
      const el = document.createElement('span');
      el.style.display = 'inline-block';
      el.setAttribute('data-key', elKey);
      el.setAttribute('wrapped', true);
      el.innerHTML = '&nbsp;';
      frag.appendChild(el);
    } else {
      const el = document.createElement('span');
      el.style.display = 'inline-flex';
      el.setAttribute('data-key', elKey);
      el.setAttribute('wrapped', true);
      el.innerText = s;
      frag.appendChild(el);
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

export function updateChildren(root, valMap = {}) {
  return Array.prototype.slice.call(root.childNodes, 0).map(child => {
    if (child.nodeType !== 3 && child.getAttribute('wrapped')) {
      return;
    }

    if (child.nodeType === 1) {
      updateMap(valMap, child.nodeName);
      child.setAttribute(
        'data-key',
        `${child.nodeName}-${valMap[child.nodeName]}`
      );
    }
    if (child.nodeType === 3) {
      const replaced = wrapTextChildren(child, valMap);
      child.replaceWith(replaced);
    }
    if (child.childNodes) {
      updateChildren(child, valMap);
    }
  });
}

export function buildStyleMap(map, root) {
  root.childNodes.forEach(child => {
    if (child.nodeType !== 3) {
      const rect = child.getBoundingClientRect();
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
