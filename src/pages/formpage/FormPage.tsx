import FlyerComponent from "../../components/flayercomponent/FlayerComponent";
import FormComponent from "../../components/formcomponent/FormComponent";


export default function FormPage() {


    return (
        <>  
        <FlyerComponent/>

        <div className="relative lg:-top-10">
        <FormComponent />
        </div>
        </>
    )
}