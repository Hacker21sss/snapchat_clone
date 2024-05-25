
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

import Image from "next/image";
export function ImagePreview({ selectedFile, close, imageChange, setFlag }: { selectedFile: string, close: () => void, imageChange: any, setFlag: any }) {
    return (
        <Dialog open={!!selectedFile}>
            <DialogContent onInteractOutside={close} className="sm:max-w-[425px] bg-white border max-w-xl flex flex-col">
                <div> {/* Wrapping in a div */}
                    <DialogHeader>
                        <div className="flex items-center relative h-3/4 my-auto "><Image
                            src={selectedFile}
                            alt='selectedFile'
                            width={400}
                            height={400}
                            className="rounded-md border mx-auto border-gray-400 object-contain"
                        />
                        </div>
                    </DialogHeader>
                    <DialogFooter className="mx-auto flex items-center p-4">
                        <DialogClose asChild>
                            <Button className="rounded-full" variant={'destructive'} onClick={close} size={'sm'}>cancel</Button>
                            </DialogClose>
                            <Button className="rounded-full" onClick={ imageChange}  size={'sm'}>change</Button>
                            <Button className="rounded-full px-4 bg-green-500 hover:bg-green-400" onClick={()=> setFlag && setFlag(true)}  size={'sm'}>next</Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}
