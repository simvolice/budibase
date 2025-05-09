import { BaseStructure } from "../BaseStructure"
import { Helpers } from "@budibase/bbui"
import { ScreenVariant } from "@budibase/types"

export class Screen extends BaseStructure {
  constructor() {
    super(true)
    this._json = {
      showNavigation: true,
      width: "Large",
      props: {
        _id: Helpers.uuid(),
        _component: "@budibase/standard-components/container",
        _styles: {
          normal: {},
          hover: {},
          active: {},
          selected: {},
        },
        _children: [],
        _instanceName: "",
        layout: "flex",
        direction: "column",
        hAlign: "stretch",
        vAlign: "top",
        size: "grow",
        gap: "M",
      },
      routing: {
        route: "",
        roleId: "BASIC",
        homeScreen: false,
      },
      name: "screen-id",
    }
  }

  role(role) {
    this._json.routing.roleId = role
    return this
  }

  normalStyle(styling) {
    this._json.props._styles.normal = styling
    return this
  }

  component(name) {
    this._json.props._component = name
    return this
  }

  table(tableName) {
    this._json.props.table = tableName
    return this
  }

  route(route) {
    this._json.routing.route = route
    return this
  }

  name(name) {
    this._json.name = name
    return this
  }

  autoTableId(autoTableId) {
    this._json.autoTableId = autoTableId
    return this
  }

  instanceName(name) {
    this._json.props._instanceName = name
    return this
  }

  customProps(props) {
    for (let key of Object.keys(props)) {
      this._json.props[key] = props[key]
    }
    return this
  }
}

export class PDFScreen extends Screen {
  constructor() {
    super()
    this._json.variant = ScreenVariant.PDF
    this._json.width = "Max"
    this._json.showNavigation = false
    this._json.props = {
      _id: Helpers.uuid(),
      _component: "@budibase/standard-components/pdf",
      _styles: {
        normal: {},
        hover: {},
        active: {},
        selected: {},
      },
      _children: [],
      _instanceName: "PDF",
      title: "PDF",
    }
  }
}
