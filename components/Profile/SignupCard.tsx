import { ISignupWithEventData } from "@/app/api/me/route";
import { useMemo } from "react";

const SignupCard = ({data}: { data: ISignupWithEventData}) => {

    if (!data.eventData) return null;

    const {eventData: { title, start_time, end_time }, date } = data;

    const options = useMemo(() => {
        return { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
    }, [])

    const timeString = useMemo(() => {
        const startDate = new Date(start_time)
        const endDate = new Date(end_time)
        
    
        const startString = startDate.toLocaleString('en-US', options).replace('at', '@');
        const endString = endDate.toLocaleString('en-US', options).replace('at', '@');
    
        const time = ''
        if (startDate.getDate() === endDate.getDate()) {
            return(`${startString} - ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`.replace('at', '@'))
        } else {
            return(`${startString} - ${endString}`)
        }
    }, [start_time, end_time])

    return(
        <div>
            <p>{title}</p>
            <p>{timeString}</p>
            <p>Signed up {(new Date(date)).toLocaleString('en-US', options)}</p>
        </div>
    )
}

export default SignupCard;