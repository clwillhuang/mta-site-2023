import { ISignupWithEventData } from "@/app/api/me/route";
import { notFound } from "next/navigation";
import { useMemo } from "react";

const SignupCard = ({data}: { data: ISignupWithEventData}) => {

    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

    const timeString = useMemo(() => {
        if (!data.eventData) {
            return(``)
        }
        const { eventData: { start_time, end_time } } = data;
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }

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
    }, [data])
    
    if (data.eventData) {
        return(
            <div>
                <p>{data.eventData.title}</p>
                <p>{timeString}</p>
                <p>You signed up {(new Date(data.eventData.date)).toLocaleString('en-US', options)}</p>
            </div>
        )
    } else {
        notFound()
    }

}

export default SignupCard;