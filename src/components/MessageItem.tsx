import { EvaluationType } from "../enums/EvaluationType";
import { MessageModel } from "../model/MessageListModel";

export interface IPropSessionItem extends MessageModel {
    onClick?: Function;
}

const SessionItem = (props: IPropSessionItem) => {
    return (
        <div id="sessionItemWrapper" className="flex flex-col justify-evenly items-center w-full box-border px-4 rounded-lg mt-5">
            <div className="flex justify-between items-center w-full mb-5">
                <h5 className="text-base font-medium">{props.name}</h5>
                <i className="text-xs text-custom-939393 not-italic">{props.create_time}</i>
            </div>
            <div className="text-ellipsis line-clamp-2 overflow-hidden text-sm font-normal not-italic w-full mb-5 whitespace-pre-wrap">{props.content}</div>
            <div className="flex justify-between items-center w-full">
                <i className="text-xs text-custom-939393 not-italic">回复ID：{props.id}</i>
                <div className="flex items-center justify-between w-[100px]">
                    {props.evaluation === EvaluationType.Positive && <div className="flex items-center">
                        <em className="inline-block bg-custom-icon-positive h-[15px] w-[15px] bg-no-repeat bg-cover" />
                        {/* <i className="text-xs text-custom-939393 not-italic">{props.agree_count}</i> */}
                    </div>}
                    {props.evaluation === EvaluationType.Negative && <div className="flex items-center">
                        <em className="inline-block bg-custom-icon-negative h-[15px] w-[15px] bg-no-repeat bg-cover" />
                        {/* <i className="text-xs text-custom-939393 not-italic">{props.disagree_count}</i> */}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default SessionItem;