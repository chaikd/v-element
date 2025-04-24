import Button from './Button';
import Collapse from './Collapse/index';
import Dropdown from './Dropdown';
import Form from './Form/index';
import FormItem from './FormItem/index';
import Icon from './Icon/index';
import Input from './Input/index';
import Message from './Message/index';
import Switch from './Switch/index';
import Tooltip from './Tooltip/index';
import type { App } from 'vue'

const components = [
  Button,
	Collapse,
	Dropdown,
	Form,
	FormItem,
	Icon,
	Input,
	Message,
	Switch,
	Tooltip
]

const install = function (App: App) {
	components.forEach((item: {name: string}) => {
		App.component(item.name, item)
	})
}

export default install

export * from './Button';
export * from './Collapse/index';
export * from './Dropdown';
export * from './Form/index';
export * from './FormItem/index';
export * from './Icon/index';
export * from './Input/index';
export * from './Message/index';
export * from './Switch/index';
export * from './Tooltip/index';