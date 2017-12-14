// import katex from 'katex';
import Flash from './flash';

// Renders math using KaTeX in any element with the
// `js-render-math` class
//
// ### Example Markup
//
//   <code class="js-render-math"></div>
//

// Loop over all math elements and render math
function renderWithKaTeX(elements, katex) {
  elements.each(function katexElementsLoop() {
    const mathNode = $('<span></span>');
    const $this = $(this);

    const display = $this.attr('data-math-style') === 'display';
    try {
      katex.render($this.text(), mathNode.get(0), { displayMode: display });
      mathNode.insertAfter($this);
      $this.remove();
    } catch (err) {
      throw err;
    }
  });
}

export default function renderMath($els) {
  if (!$els.length) return;

  import(/* webpackChunkName: 'katex' */ 'katex').then((katex) => {
    $.get(gon.katex_css_url, () => {
      const css = $('<link>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: gon.katex_css_url,
      });
      css.appendTo('head');
      renderWithKaTeX($els, katex);
    });
  }).catch((err) => {
    Flash(`Can't load katex module: ${err}`);
  });
}
