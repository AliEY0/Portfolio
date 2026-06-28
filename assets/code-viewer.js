(function () {
  const keywordPattern = /\b(?:auto|break|case|char|const|continue|default|do|double|else|enum|float|for|if|int|long|return|short|signed|sizeof|static|struct|switch|typedef|unsigned|void|while)\b/g;
  const tokenPattern = /\/\/.*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+\b|\b[A-Za-z_]\w*(?=\s*\()/g;

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function normalizeSource(value) {
    const lines = value.replace(/\r\n?/g, "\n").split("\n");

    if (lines[0] && lines[0].trim() === "") {
      lines.shift();
    }

    if (lines[lines.length - 1] && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    const indents = lines
      .filter((line) => line.trim() !== "")
      .map((line) => line.match(/^\s*/)[0].length);
    const minIndent = indents.length ? Math.min(...indents) : 0;

    return lines.map((line) => line.slice(minIndent));
  }

  function highlightKeywords(value) {
    return value.replace(keywordPattern, '<span class="code-kw">$&</span>');
  }

  function highlightLine(line) {
    if (line.trimStart().startsWith("#")) {
      return escapeHtml(line).replace(/#\w+/, '<span class="code-pp">$&</span>');
    }

    let output = "";
    let index = 0;

    line.replace(tokenPattern, (match, offset) => {
      output += highlightKeywords(escapeHtml(line.slice(index, offset)));

      if (match.startsWith("//")) {
        output += '<span class="code-comment">' + escapeHtml(match) + "</span>";
      } else if (match.startsWith("\"") || match.startsWith("'")) {
        output += '<span class="code-str">' + escapeHtml(match) + "</span>";
      } else if (/^\d+$/.test(match)) {
        output += '<span class="code-num">' + escapeHtml(match) + "</span>";
      } else {
        output += '<span class="code-fn">' + escapeHtml(match) + "</span>";
      }

      index = offset + match.length;
      return match;
    });

    output += highlightKeywords(escapeHtml(line.slice(index)));
    return output;
  }

  function buildListing(source, label) {
    const wrapper = document.createElement("div");
    wrapper.className = "code-listing";

    if (label) {
      wrapper.setAttribute("aria-label", label);
    }

    const list = document.createElement("ol");

    normalizeSource(source).forEach((line) => {
      const item = document.createElement("li");
      const code = document.createElement("code");
      code.innerHTML = highlightLine(line);
      item.appendChild(code);
      list.appendChild(item);
    });

    wrapper.appendChild(list);
    return wrapper;
  }

  function enhanceCodeViewer(node) {
    const source = node.tagName === "SCRIPT" ? node.textContent : node.textContent;
    const label = node.getAttribute("aria-label") || "Codevoorbeeld";
    node.replaceWith(buildListing(source, label));
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("script.code-viewer[type='text/plain'], pre.code-viewer").forEach(enhanceCodeViewer);
  });
})();
