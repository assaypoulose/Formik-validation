
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import './App.css';
import { useFormik } from "formik";

function App() {
const formik = useFormik({
  initialValues : {
    name : '',
    email : '',
    mobilenumber : ''
  },
  onSubmit : (value) => {
    console.log(value);
  },
  validate : values=>{
    const errors = {};
    if(!values.name){
      errors.name = 'Name is required';
    } else {
      fetch('https://65fda9d1b2a18489b3853c1e.mockapi.io/student?username='+values.name)
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data);
        let filterdata = data.filter(val=> val.username === values.name);
        if(filterdata.length > 0) {
          errors.name = "Name already exist"
        }
      });
    }
    console.log(errors);

    if(!values.email){
      errors.email = "Email is required";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    {errors.email = "Email is invalid";}
    if(!parseInt(values.mobilenumber)){
      errors.mobilenumber = " Mobile number is required";
    } else if(!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(values.mobilenumber)){
      errors.mobilenumber = "Incorrect mobile number";
    }
    return errors
  }
});

  return (
    <div className="App">
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input onChange={formik.handleChange} value={formik.values.name} name="name" type="text" invalid={formik.errors.name}/>
          {formik.errors.name ? (<FormFeedback>{formik.errors.name}</FormFeedback>) : ("")}
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input onChange={formik.handleChange} value={formik.values.email} name="email" type="text" invalid={formik.errors.email}/>
          {formik.errors.email ? (<FormFeedback>{formik.errors.email}</FormFeedback>) : ("")}
        </FormGroup>
        <FormGroup>
          <Label>Mobile Number</Label>
          <Input onChange={formik.handleChange} name="mobilenumber" value={formik.values.mobilenumber} type="text" invalid={formik.errors.mobilenumber} />
          {formik.errors.mobilenumber ? (<FormFeedback>{formik.errors.mobilenumber}</FormFeedback>) : ("")}
        </FormGroup>
        <Button color="success" onClick={formik.handleSubmit} type="button">Submit</Button>
      </Form>
    </div>
  );
}

export default App;
