import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button";

const Statevar = () => {

    let [myNum, SetMyNum] = useState(0); // 2 is the initial value for myNum

    function incrementFunc() {
        // myNum = myNum + 10;
        // console.log(myNum);
        // console.log("SetMyNum = ",SetMyNum);
        SetMyNum(myNum +10);// when btn click this function add 10 with prev myNum value


        // SetMyNum(myNum +1);
        // console.log(myNum);
        // SetMyNum(myNum +1);
        // SetMyNum(myNum +2);
        // console.log(myNum); //Batching in react only one setNum works here even have multiple

        //if we want to run each setstate one by one we need tell to react below way StateSetter Function
        // SetMyNum(myNum => myNum +1);
        // SetMyNum(myNum => myNum +1);
        // SetMyNum(myNum => myNum +1);
    }

    return (
        <div className="m-4 border-2 border-lime-400 p-2 flex gap-2">
            <Badge variant="destructive">Num - {myNum}</Badge>
            <Button className="flex-grow" onClick={incrementFunc} >Inceremnet Value</Button>
        </div>

    );

};

export default Statevar;