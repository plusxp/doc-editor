import Engine from '@hicooper/doc-engine'
import localeEn from './locale/en'
import localeZhCn from './locale/zh-cn'
import toolbar from './toolbar'
import toolbarMini from './toolbar-mini'
import constants from './constants'
import template from './template'
import ControlBar from './controlBar'
import Command from './command'
import Hotkey from './hotkey'
import History from './history'
import Selection from './selection'
import Scrollbar from '../../scrollbar'
import schema from './schema'
import { tableInnerSchema, unWrapperTable, unWrapperTableHTML } from './utils'
import schemaConfig from '../../schema/config'
import { getHeight } from '../../utils/dom'
import SectionBase from '../base'

const { $ } = Engine
const getKeys = (keyString) => {
  let keys = null
  if (keyString) {
    keys = []
    keyString.split('+')
      .forEach((key) => {
        keys.push(key.trim(), '+')
      })
    if (keys.length > 0) delete keys[keys.length - 1]
  }
  return keys
}

const locale = {
  en: localeEn,
  'zh-cn': localeZhCn,
}

class Table extends SectionBase {
  constructor(engine, contentView) {
    super()

    this.destroy = () => {
      this.active = false
      this.unBindKeyEvents()
      this.engine.toolbar.restore()
    }

    this.activate = () => {
      this.active = true
      this.container.css('user-select', 'none')
      if (!this.mobile) {
        if (this.engine.options.type === 'mini') {
          this.engine.toolbar.set(toolbarMini(this))
        } else {
          this.engine.toolbar.set(toolbar(this))
        }
      }
      this.controlBar.refresh()
    }

    this.unactivate = () => {
      this.active = false
      this.container.css('user-select', 'auto')
      this.selection.clear()
      this.controlBar.hide()
      this.removeEditor()
      this.engine.toolbar.restore()
    }

    this.embedToolbar = () => {
      const options = this.engine ? this.engine.options : this.contentView.options
      const config = options.table || {}
      let embed = [
        {
          type: 'dnd',
        }, {
          type: 'maximize',
        }, {
          type: 'separator',
        }, {
          type: 'copy',
        }, {
          type: 'delete',
        },
      ]
      if (this.mobile) {
        embed = [{
          type: 'copy',
        }, {
          type: 'delete',
        }]
      } else if (options.type === 'mini') {
        embed = [
          {
            type: 'maximize',
          }, {
            type: 'separator',
          }, {
            type: 'copy',
          }, {
            type: 'delete',
          },
        ]
      }

      if (Array.isArray(config.embed)) {
        return config.embed
      }
      if (typeof config.embed === 'object') {
        const embedArray = []
        embed.forEach((item) => {
          if (config.embed[item.type] !== false) {
            embedArray.push(item)
          }
        })
        return embedArray
      }
      return embed
    }

    this.maximize = () => {
      this.scrollbar.refresh()
      if (this.engine) {
        this.fullscreen = true
        this.setSectionValue()
      }
      if (this.options.type === 'mini') {
        const triggerCols = this.container.find(this.template.COLS_HEADER_TRIGGER_CLASS)
        const triggerRows = this.container.find(this.template.ROWS_HEADER_TRIGGER_CLASS)
        triggerCols.css('height', '100%')
        triggerRows.css('width', '100%')
        this.onTableSizeChange()
      }
    }

    this.restore = () => {
      this.scrollbar.refresh()
      if (this.engine) {
        this.fullscreen = false
        this.history.clear()
      }
      if (this.options.type === 'mini') {
        this.onTableSizeChange()
      }
    }

    this.handleTdChanged = () => {
      if (!this.subEngine) {
        return
      }
      // ????????????????????????????????????????????????????????????????????????????????????
      this.subEngine.td.html(Engine.StringUtils.transformCustomTags(this.subEngine.change.getValue()))
      this.subEngine.section.renderAll(this.subEngine.td, undefined, this.subEngine)
      this.command.changed()
      this.delayToUpdateToolbar()
      const tdHeight = this.subEngine.td[0].offsetHeight
      if (!this.tdHeight || tdHeight !== this.tdHeight) {
        this.tdHeight = tdHeight
        this.controlBar.render('input')
        this.selection.reRenderActiveBox()
      }
      this.onTableSizeChange()
    }

    this.startEdit = (e) => {
      if (!this.active) {
        return
      }
      const hideTextarea = Engine.$(e.target)
        .closest(this.template.TABLE_TEXTAREA_CLASS)
      if (!hideTextarea[0]) {
        return
      }
      // ?????? ???????????? ??? ???????????? ????????????
      // ???????????? compositionend ??????
      // ???????????? input ??????
      // safari ??? input ?????????????????? isComposing ??????????????? inputType
      // safari ????????????????????????????????????
      //   1.?????????????????????inputType ??? insertCompositionText ??? input ??????
      //   2.??????????????????????????????????????? deleteCompositionText ??? input ?????? ??????????????????????????? insertFromComposition ?????????????????????
      // ?????? safari ????????? compositionend ???????????????????????????????????????????????????????????????
      if (e.type === 'input' && (e.isComposing || e.inputType === 'insertCompositionText' || e.inputType === 'deleteCompositionText' || e.inputType === 'insertFromComposition')) {
        return
      }
      // ????????????????????????????????????
      if (this.subEngine) return
      if (this.selection.td && this.selection.single) {
        // firefox ??????????????????e.data ??? undefined ????????? target ??????
        this.createEditor(Engine.$(this.selection.td), '<p>'.concat(e.data || e.target.value, '</p>'))
      }
    }

    this.saveValue = () => {
      this.setSectionValue(true)
    }

    this.setSectionValue = (self) => {
      const tableModel = this.selection.tableModel
      let html = this.tableRoot[0].outerHTML
      if (html === this.lastSaveHtml) return
      this.lastSaveHtml = html
      // ??????????????????????????????????????????????????? HTML ??????
      html = new Engine.HTMLParser(html, this.engine.schema, this.engine.conversion).toValue()
      const value = {
        rows: tableModel.rows,
        cols: tableModel.cols,
        html,
      }
      this.sectionManage.setValue(this.sectionRoot, value)
      // ??????????????????????????????????????????value, ????????????????????????
      if (self) {
        return
      }
      // ?????? undo ??????
      if (this.fullscreen) {
        this.history.save(value)
      }
      this.engine.history.save()
    }

    this.tryUndo = () => {
      if (this.subEngine) {
        if (this.subEngine.history.index === 0) {
          this.removeEditor(true)
        }
        return
      }
      this.undo()
    }

    this.tryRedo = () => {
      if (this.subEngine) {
        return
      }
      this.redo()
    }

    this.undo = () => {
      if (this.subEngine && this.subEngine.history.hasUndo) {
        this.subEngine.command.execute('undo')
        return
      }

      if (this.subEngine) {
        this.removeEditor(true)
        return
      }

      if (this.fullscreen) {
        this.history.undo()
      } else {
        this.focusSection()
        this.engine.command.execute('undo')
      }
    }

    this.focusSection = () => {
      this.engine.change.selectSection(this.sectionRoot)
      this.engine.change.focus()
    }

    this.redo = () => {
      if (this.subEngine) {
        this.subEngine.command.execute('redo')
        return
      }

      if (this.fullscreen) {
        this.history.redo()
      } else {
        this.engine.command.execute('redo')
      }
    }

    this.delayToUpdateToolbar = () => {
      if (this.toolbarTimer) {
        clearTimeout(this.toolbarTimer)
      }
      this.toolbarTimer = setTimeout(() => {
        this.engine.toolbar.updateState()
      }, 100)
    }

    this.isEditing = (td) => {
      return this.subEngine && td[0] === this.subEngine.td[0]
    }

    this.createEditor = (td, content) => {
      // ????????????
      if (this.isEditing(td)) {
        return
      }
      // ????????????????????????
      this.selection.showSubEditor()
      const imageOptions = {
        ...this.engine.options.image,
        fixSize: true,
        hideEmbedToolbar: false,
      }

      this.subEngine = Engine.create(this.selection.editAreaContent, {
        plugins: ['bold', 'italic', 'fontcolor', 'fontsize', 'strikethrough', 'underline', 'backcolor', 'removeformat', 'code', 'file', 'label', 'list', 'link', 'image', 'tasklist', 'indent'],
        lang: this.engine.options.lang,
        image: imageOptions,
        onBeforeRenderImage: this.engine.options.onBeforeRenderImage,
        file: this.engine.options.file,
      })
      this.subEngine.uploader = this.engine.uploader
      this.subEngine.td = td
      this.subEngine.locale = this.engine.locale
      this.subEngine.schema.add(this.innerSchema)
      this.delayToUpdateToolbar()
      this.subEngine.change.setValue(unWrapperTableHTML(td.html()))
      if (content) {
        // ??????????????? html ?????????????????? table Section????????????????????????????????????????????? render ?????????
        let html = unWrapperTableHTML(content)
        console.log(html)
        html = new Engine.HTMLParser(html, this.subEngine.schema, this.subEngine.conversion).toValue()
        this.subEngine.command.execute('selectall')
        this.subEngine.change.setValue(html)
        this.handleTdChanged()
      }

      setTimeout(() => {
        if (!this.subEngine) return
        this.subEngine.focusToEnd()
      }, 10)
      this.subEngine.on('change', this.handleTdChanged)
      this.subEngine.on('select', this.delayToUpdateToolbar)
      this.subEngine.on('paste:origin', unWrapperTable)
      // ??????????????????????????? tab?????????????????????????????????????????????????????????
      this.subEngine.on('keydown:tab', () => {
        return false
      })
    }

    this.removeEditor = (silence) => {
      // ???????????????
      if (!this.subEngine) {
        return
      }
      this.handleTdChanged()
      this.subEngine.destroy()
      this.subEngine = null
      this.selection.hideSubEditor()
      // ??????Section??????
      if (!silence) {
        this.setSectionValue()
      }
    }

    this.prevent = (e) => {
      const table = Engine.$(e.target)
        .closest('.lake-table')
      if (table[0]) {
        e.preventDefault()
      }
    }

    this.unBindKeyEvents = () => {
      document.removeEventListener('contextmenu', this.prevent)
    }

    this.bindKeyEvents = () => {
      this.hotkey.add('backspace, del, delete', this.command.clear)
      this.hotkey.add('up', this.selection.selectUp)
      this.hotkey.add('down', this.selection.selectDown)
      this.hotkey.add('left', this.selection.selectLeft)
      this.hotkey.add('right', this.selection.selectRight)
      this.hotkey.add('tab, shift+tab', this.tab)
      this.hotkey.add('enter', this.selection.selectEnter)
      this.hotkey.add('esc', this.selection.cancelSelect)
      this.hotkey.add('command+a, ctrl+a', this.selection.selectTable)
      this.hotkey.add('command+z, ctrl+z', this.tryUndo)
      this.hotkey.add('command+b, ctrl+b', () => {
        this.command.execute('bold')
      })
      this.hotkey.add('command+i, ctrl+i', () => {
        this.command.execute('italic')
      })
      this.hotkey.add('command+u, ctrl+u', () => {
        this.command.execute('underline')
      })
      this.hotkey.add('command+shift+x, ctrl+shift+x', () => {
        this.command.execute('strikethrough')
      })

      this.hotkey.add('command+y, command+shift+z, ctrl+y, ctrl+shift+z', this.tryRedo)
      document.addEventListener('contextmenu', this.prevent)
    }

    this.tab = (e) => {
      if (this.subEngine) {
        this.subEngine.command.queryState('tasklist')
      } else {
        this.selection.selectTab(e)
      }
    }

    this.bindEditEvents = () => {
      if (this.inited) return
      this.controlBar.on('startChangeCellSize', this.selection.clear)
      this.controlBar.on('clickColsHeader', this.selection.selectCol)
      this.controlBar.on('clickRowsHeader', this.selection.selectRow)
      this.controlBar.on('clickTableHeader', this.selection.selectTable)
      this.controlBar.on('sizeChanged', () => {
        this.setSectionValue()
        this.onTableSizeChange()
      })

      this.controlBar.on('tableSizeChange', () => {
        this.onTableSizeChange()
      })

      this.command.on('actioned', (action, silence) => {
        if (action === 'paste' || action === 'fontstyle') {
          Engine.section.renderAll(this.container, undefined, this.engine)
        }
        this.removeEditor()
        this.controlBar.render(action)
        this.selection.render(action)
        this.scrollbar.refresh()
        if (!silence) {
          this.setSectionValue()
        }
      })

      this.command.on('tableRemoved', this.destroy)
      this.selection.on('select', () => {
        this.delayToUpdateToolbar()
        this.removeEditor()
        this.controlBar.refresh('select')
      })

      this.selection.on('cancelSelect', () => {
        this.removeEditor()
        this.controlBar.clearActiveStatus()
      })
      this.selection.on('active', this.createEditor)
      this.container.on('compositionend', this.startEdit)
      this.container.on('input', this.startEdit)
      this.container.on('select', this.prevent)
      this.bindKeyEvents()
      this.engine.on('save:before', () => {
        return this.setSectionValue()
      })
      this.inited = true
    }

    this.reRender = (value) => {
      this.delayToUpdateToolbar()
      if (!value) return
      this.container.html('')
      this.render(this.container, value, true)
    }

    this.engine = engine
    this.contentView = contentView
    const options = engine ? engine.options : contentView.options
    this.locale = locale[options.lang || 'en']
    this.constants = constants(this)
    this.options = options.table || {}
    this.options.type = this.options.type || (['mini', 'mobile', 'line'].indexOf(options.type) > -1 ? 'mini' : 'max')
    this.template = template(this)

    if (!engine) {
      return
    }

    this.change = engine.change
    this.sectionManage = engine.section
    this.controlBar = new ControlBar(this)
    this.selection = new Selection(this)
    this.command = new Command(this)
    this.hotkey = new Hotkey(this)
    this.innerSchema = tableInnerSchema(schemaConfig)
    this.history = new History(this)
    this.mobile = this.engine.options.type === 'mobile'
  }

  select() {
    if (this.state.readonly) {
      super.select.call(this)
    } else {
      const { container } = this
      if (container[0].childNodes.length > 0) {
        container.addClass('lake-table-selected')
      }
    }
  }

  unselect() {
    if (this.state.readonly) {
      super.unselect.call(this)
    } else {
      const { container } = this
      if (container[0].childNodes.length > 0) {
        container.removeClass('lake-table-selected')
      }
    }
  }

  selectByOther(color) {
    const { container } = this
    if (container[0].childNodes.length > 0) {
      container.css('outline', `2px solid ${color}`)
    }
  }

  unselectByOther() {
    const { container } = this
    if (container[0].childNodes.length > 0) {
      container.css('outline', '')
    }
  }

  getTableHeight() {
    const height = getHeight(this.tableRoot[0])
    return this.options.type === 'mini' && !this.state.maximize ? height + 6 : height
  }

  onTableSizeChange() {
    const tableWidth = this.tableRoot[0].offsetWidth
    const pageWidth = this.engine.container[0].offsetWidth
    const editAreaWidth = this.table.offsetWidth
    let margin = 0
    // ??????????????????????????????????????????margin ???????????????margin??? ((pageWidth - editAreaWidth) / 2 - 20) px, 20 ??? ????????????????????????
    const maxMargin = (pageWidth - editAreaWidth) / 2 - 20
    // ???????????????????????????
    const tableMaxSize = editAreaWidth + maxMargin * 2
    if (tableWidth > editAreaWidth) {
      margin = (tableWidth - editAreaWidth) / 2
      const maxMargin = (pageWidth - editAreaWidth) / 2 - 20
      margin = Math.min(margin, maxMargin)
    }
    
    $(this.tableBody)
      .css({
        margin: `0 -${margin}px`,
        height: `${this.getTableHeight()}px`,
        width: `${Math.min(tableWidth, tableMaxSize)}px`,
      })
    if (this.options.type === 'mini' && !this.state.maximize) {
      const triggerCols = this.container.find(this.template.COLS_HEADER_TRIGGER_CLASS)
      const triggerRows = this.container.find(this.template.ROWS_HEADER_TRIGGER_CLASS)
      triggerCols.css('height', `${this.tableRoot[0].offsetHeight}px`)
      const wrapperWidth = this.tableWrapper[0].offsetWidth
      triggerRows.css('width', `${tableWidth > wrapperWidth ? wrapperWidth : tableWidth}px`)
    }
    this.scrollbar.refresh()
  }

  render(container, value, self) {
    const engine = this.engine
    container.on('dragstart', (event) => {
      event.stopPropagation()
      event.preventDefault()
    })
    if (value.html) {
      if (!engine) {
        this.contentView.schema.add(schema)
        value.html = new Engine.HTMLParser(value.html, this.contentView.schema, this.contentView.conversion).toValue()
      }
      value.html = Engine.StringUtils.transformCustomTags(value.html)
    }

    if (!engine) {
      const _sectionHTML = this.template.htmlView(value)
      container.append(_sectionHTML)
      Engine.section.renderAll(container, undefined, this.contentView)
      this.viewport = container.find(this.template.VIEWPORT_READER)
      this.scrollbar = new Scrollbar(this.viewport, true, false, true)
      if (this.contentView.docVerstion === 0) {
        this.container.css({
          'margin-top': '24px',
          'margin-bottom': '24px',
        })
      }
      return
    }

    const sectionHTML = this.template.htmlEdit(value)
    container.append(sectionHTML)
    Engine.section.renderAll(container, undefined, engine)
    if (this.options.type === 'mini') {
      const root = container.closest('div[data-section-key=table]')
      if (root.length > 0) {
        root.attr('data-section-table', 'mini')
      }
    }
    this.tableRoot = container.find(this.template.TABLE_CLASS)
    this.viewport = container.find(this.template.VIEWPORT)
    this.tableWrapper = container.find(this.template.TABLE_WRAPPER_CLASS)
    this.table = this.engine.container[0].querySelector('[data-section-key="table"]')
    this.tableBody = this.engine.container[0].querySelector('[data-section-key="table"] [data-section-element="body"]')
    this.selection.init()
    this.controlBar.init()
    this.scrollbar = new Scrollbar(this.viewport, true, false, true)
    this.bindEditEvents()

    if (!value.html || self) {
      // ??????????????????????????????sectionValue????????????????????????????????????????????????????????????
      this.setSectionValue(self)
    }
    this.onTableSizeChange()
  }
}

Table.type = 'block'
Table.canSearch = true
Table.uid = true
export default Table
