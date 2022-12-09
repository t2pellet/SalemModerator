import React from 'react';
import { connect } from 'react-redux';
import { ProgressBar, Text } from 'react-native-paper';
import { clearTimer } from '../redux/slices/timer';

interface TimerProps {
    timerKey: string;
    time: number;
    autoStart?: boolean;
    onTimeEnded: () => void;
    clearTimerState: typeof clearTimer;
    activeTimers: string[];
}

interface TimerState {
    timeLeft: number;
}

class Timer extends React.Component<TimerProps, TimerState> {
    private interval: NodeJS.Timer;

    static defaultProps = {
        autoStart: false
    };

    constructor(props: TimerProps) {
        super(props);
        const { time } = props;
        this.state = {
            timeLeft: time * 1000
        };
    }

    componentDidMount() {
        this.startTimer();
    }

    componentDidUpdate(prevProps: Readonly<TimerProps>) {
        const { time, timerKey } = this.props;

        if (prevProps.timerKey !== timerKey) {
            this.setState({
                timeLeft: time * 1000
            });
            clearInterval(this.interval);
            this.startTimer();
        }
    }

    componentWillUnmount() {
        const { timerKey, clearTimerState } = this.props;

        if (this.isActive()) {
            clearInterval(this.interval);
            clearTimerState(timerKey);
        }
    }

    isActive(): boolean {
        const { timerKey, activeTimers, autoStart } = this.props;

        return autoStart || timerKey in activeTimers;
    }

    startTimer() {
        this.interval = setInterval(() => {
            const { timeLeft } = this.state;
            const { timerKey, onTimeEnded, clearTimerState } = this.props;

            if (this.isActive()) {
                if (timeLeft > 0) {
                    this.setState({ timeLeft: timeLeft - 100 });
                } else {
                    clearInterval(this.interval);
                    clearTimerState(timerKey);
                    onTimeEnded();
                }
            }
        }, 100);
    }

    render() {
        const { time } = this.props;
        const { timeLeft } = this.state;
        const timeInSeconds = Math.floor(timeLeft / 1000);
        const timeFraction = timeLeft / (time * 1000);

        if (this.isActive()) {
            return (
                <div className="timer">
                    <ProgressBar animatedValue={timeFraction} />
                    <Text>{timeInSeconds}</Text>
                </div>
            );
        }

        return null;
    }
}

const dispatchToProps = {
    clearTimerState: clearTimer
};

const stateToProps = (state) => ({
    activeTimers: state.timer
});

export default connect(stateToProps, dispatchToProps)(Timer);
