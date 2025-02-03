import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react';

export const Comment = () => {
    return (
        <div className="min-h-[150px] w-[100%]  p-[20px] flex justify-center items-center">
            <div className="h-[100%] w-[100%] lg:w-[1280px] rounded-[20px] border-[3px] p-[10px]">
                <div>
                    <p className="text-[#064ba4] font-semibold">Comment</p>
                </div>
                <div className="flex justify-between mt-[10px]">
                    {/* <input className="w-[85%] h-[60px] border-[2px] rounded-[10px]  p-[10px]" placeholder="Comment"/> */}
                    <Textarea className="w-[85%] h-[60px] border-[2px] rounded-[10px]  p-[10px]" placeholder="Comment"/>
                    <div className="flex justify-center items-center h-[80px] w-[40px]">
                        <button className="h-[50%] w-[100%] border-[4px] rounded-[10px] bg-[#0480c7] border-[#064ba4] text-[white] flex justify-center items-center"><Plus /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}  