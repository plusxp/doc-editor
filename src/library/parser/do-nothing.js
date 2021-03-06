import Engine from '@hicooper/doc-engine'

class DoNothingParser extends Engine.ExportParser {
  parse(element) {
    const div = Engine.$('<div />')
    div.append(element)
    return {
      html: div.html(),
      text: new Engine.HTMLParser(div).toText(),
    }
  }
}

export default DoNothingParser
