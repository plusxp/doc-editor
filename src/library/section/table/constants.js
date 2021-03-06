export default function (section) {
  return {
    defaultRows: 3,
    defaultCols: 3,
    MENU: [{
      action: 'cut',
      icon: 'cut',
      text: section.locale.cut,
    }, {
      action: 'copy',
      icon: 'copy',
      text: section.locale.copy,
    }, {
      action: 'mockPaste',
      icon: 'paste',
      text: section.locale.paste,
    }, {
      action: 'clear',
      icon: 'clear',
      text: section.locale.clear,
    }, {
      split: true,
    }, {
      action: 'insertColLeft',
      icon: 'insert-col-left',
      text: section.locale.insertColLeft,
    }, {
      action: 'insertColRight',
      icon: 'insert-col-right',
      text: section.locale.insertColRight,
    }, {
      action: 'insertRowUp',
      icon: 'insert-row-up',
      text: section.locale.insertRowUp,
    }, {
      action: 'insertRowDown',
      icon: 'insert-row-down',
      text: section.locale.insertRowDown,
    }, {
      split: true,
    }, {
      action: 'mergeCell',
      icon: 'merge-cell',
      text: section.locale.mergeCell,
    }, {
      action: 'splitCell',
      icon: 'split-cell',
      text: section.locale.splitCell,
    }, {
      split: true,
    }, {
      action: 'removeCol',
      icon: 'remove-col',
      text: section.locale.removeCol,
    }, {
      action: 'removeRow',
      icon: 'remove-row',
      text: section.locale.removeRow,
    }, {
      split: true,
    }, {
      action: 'removeTable',
      icon: 'remove-table',
      text: section.locale.removeTable,
    }],
  }
}
