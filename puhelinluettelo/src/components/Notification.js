const Notification = ({ message, style }) => {
    if (message === '') {
        return null
      }

    const styleGreen = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const styleRed = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notificationStyle = style === 'green' ? styleGreen : styleRed

    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
}

export default Notification