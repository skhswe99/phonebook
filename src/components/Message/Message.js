import './Message.css'

const Message = ({message}) => {
    // conditional rendering
    if (message.text && message.warning) {
        return(
            <p className="warning">
                {message.text}
            </p>
        )
    } else if (message.text && !message.warning) {
        return (
            <p className="message">
                {message.text}
            </p>
        )
    } else {
        return null
    }
}

export default Message