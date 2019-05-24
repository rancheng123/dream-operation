import {Icon, message} from 'antd'
import MessageError from '@svg/message_error.svg'
import MessageSuccess from '@svg/message_success.svg'
/**
 * 全局message
 * @param type
 * @param message
 */
export const showMessageClean =(type, info) => {

    message.open({
        content: info,
        icon: <Icon component={type === 'success'? MessageSuccess: MessageError}/>
    } );
}