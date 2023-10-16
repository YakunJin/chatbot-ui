import { SessionModel } from "../model/SessionListModel";

export interface IPropSessionItem extends SessionModel {
    isActive?: boolean;
    onClickSessionItem?: Function;
}

const SessionItem = (props: IPropSessionItem) => {
    const onClick = () => {
        props.onClickSessionItem && props.onClickSessionItem();
    }
    return (
        <div id="sessionItemWrapper" className={`flex flex-col justify-evenly items-center w-[538px] box-border px-4 py-5 custom-border-thin-lighter rounded-lg mt-5 hover:bg-custom-F8F9FD relative`} onClick={onClick}>
            {props.isActive && <div className="absolute left-0 top-0 h-full w-1 bg-custom-335DFF rounded-tl-lg rounded-bl-lg" />}
            <div className="flex justify-between items-center w-full mb-5">
                <h5 className="text-base">{props.name}</h5>
                <i className="text-xs text-custom-939393 not-italic">{props.create_time}</i>
            </div>
            <p className="text-ellipsis line-clamp-2 overflow-hidden text-sm font-normal not-italic w-full mb-5">{props.content}</p>
            <div className="flex justify-between items-center w-full">
                <i className="text-xs text-custom-939393 not-italic">对话ID：{props.id}</i>
                <div className="flex items-center justify-between w-[100px]">
                    <div className="flex items-center">
                        <em className="inline-block bg-custom-icon-positive h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" />
                        <i className="text-xs text-custom-939393 not-italic">{props.agree_count}</i>
                    </div>
                    <div className="flex items-center">
                        <em className="inline-block bg-custom-icon-negative h-[15px] w-[15px] bg-no-repeat bg-cover mr-[6px]" />
                        <i className="text-xs text-custom-939393 not-italic">{props.disagree_count}</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionItem;