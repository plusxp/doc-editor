import '@hicooper/doc-engine/lib/index.css'
import hotkey from './config/hotkey'
import Engine from './editor/engine'
import FullEditor from './editor/full'
import MultiPageEditor from './editor/multi-page'
import MiniEditor from './editor/mini'
import MobileEditor from './editor/mobile'
import LineEditor from './editor/line'
import Outline from './utils/outline'
import ContentView from './editor/content-view'
import ExportParser from './parser/export'
import WordExportParser from './parser/word'
import PdfExportParser from './parser/pdf'
import DoNothingExportParser from './parser/do-nothing'
import { DocVersion } from './utils/string'
import htmlToLake from './parser/lake'

const HotKeys = hotkey()
  .map((item) => {
    item.text = item.text.replace(/<br.*?>/, '')
    return item
  })
Engine.registerClipboardExportParser(new ExportParser())

FullEditor.mini = MiniEditor
FullEditor.mobile = MobileEditor
FullEditor.line = LineEditor
FullEditor.view = ContentView

export default FullEditor

export {
  Engine,
  MultiPageEditor,
  FullEditor,
  MiniEditor,
  MobileEditor,
  LineEditor,
  ContentView,
  HotKeys,
  Outline,
  ExportParser,
  WordExportParser,
  DoNothingExportParser,
  DocVersion,
  htmlToLake,
  PdfExportParser,
}
