class textSelector {
  constructor(editor){
    this.editor = editor;
    this.quillInstance = null;
  }

  init(){
    this.initEditor();
    this.mouseUpTextSelector();
  }

  initEditor(){
    // This makes pasted text wrapped around div tags rather than p tags
    var Block = Quill.import('blots/block');
    Block.tagName = 'DIV';
    Quill.register(Block, true);
    Block.tagName = 'DIV';
    Quill.register(Block, true);
    this.quillInstance = new Quill(this.editor);
  }

  mouseUpTextSelector(){
    var that = this;
    $( ".editor" ).mouseup(function() {
      that.processSelection();
    });
  }

  processSelection(){
    var range = this.quillInstance.getSelection();
    if (range) {
      if (range.length == 0) {
        console.log('User cursor is at index', range.index);
      } else {
        let text = this.quillInstance.getText(range.index, range.length);
        console.log('User has highlighted: ', text);
        console.log('Range: ');
        console.log(range);
        // this.highlightText(range.index, range.length-1);
        this.showSelectedText(text);
      }
    } else {
      console.log('User cursor is not in editor');
    }
  }

  showSelectedText(text) {
    let $element = $('.currentTextSelections');
    let numberOfChildren = $element.children().length;
    if (numberOfChildren == null || numberOfChildren == undefined){
      numberOfChildren = 1;
    }
    numberOfChildren++;
    $( ".currentTextSelections" ).append(`<div class="textSelection"><strong>Selection ${numberOfChildren}</strong><br>${text}</div>`);
  }

  highlightText(start, end){
    this.quillInstance.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      return new Delta().insert(node.data);
    });
    
    // Interpret a <b> tag as bold
    this.quillInstance.clipboard.addMatcher('B', function(node, delta) {
      return delta.compose(new Delta().retain(delta.length(), { bold: true }));
    });

    this.quillInstance.clipboard.dangerouslyPasteHTML(start, '<span class="highlight"></span', 'user');
    // this.quillInstance.clipboard.dangerouslyPasteHTML(end, '</span>');

    
  }

}
$(document).ready(function(){
  var selector = new textSelector('.editor');  
  selector.init();
})