import React from 'react';
import ReactJson from 'react-json-view';

const styles = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 999999
    },
    modalMain: {
        position: 'fixed',
        background: 'white',
        width: '80%',
        height: '80%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column'
    },
    children: {
        width: '100%',
        height: '85%',
        padding: 10,
        flexGrow: 1,
        overflow: 'scroll'
    },
    footer: {
        width: '100%',
        height: 55,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderTop: '1px solid rgba(0, 0, 0, .2)'
    },
    button: {
        float: 'right'
    },
    title: {
        fontSize: 18,
        fontWeight: 500
    },
    preStyle: {
        display: 'block',
        padding: '10px 30px',
        margin: '0',
        overflow: 'scroll',
    }
};

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showJson: false
        };

        this.toggleJsonView = this.toggleJsonView.bind(this);
    }

    toggleJsonView() {
        this.setState({
            showJson: !this.state.showJson
        });
    }

    render() {
        const show = this.props.showModal ? 'block' : 'none';
        const buttonText = this.state.showJson ? "Show Raw View" : "Show JSON View";
        const editor = this.state.showJson ? (
            <ReactJson src={this.props.formData} />
        ) : (
                <pre style={styles.preStyle}>
                    {JSON.stringify(this.props.formData, null, 2)}
                </pre>
            );

        return (
            <div style={{ ...styles.modal, display: show }}>
                <section style={styles.modalMain}>
                    <div style={styles.footer}>
                        <span style={styles.title}>Generated View</span>
                        <button style={styles.button} className="btn btn-primary" onClick={this.toggleJsonView}>
                            {buttonText}
                        </button>
                    </div>
                    <div style={styles.children}>
                        {editor}
                    </div>
                    <div style={styles.footer}>
                        <button style={styles.button} className="btn btn-primary" onClick={this.props.handleClose}>
                            Close
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}