const React = require('react');
const { PureComponent } = React;

class Test extends PureComponent {
    state = {
        counter : 0,
        array : [],
    };

    onClick = (prevState) => {
        this.setState({
            array : [...prevState.array, 1],
        });
    };

    render() {
        return (
            <>
                <button onClick={this.onClick}>클릭</button>
            </>
        );
    };

}

module.exports = Test;