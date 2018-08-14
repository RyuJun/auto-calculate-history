import React, { Component } from 'react';
import PageTemplate from './PageTemplate'
import CalculateFormInput from './CalculateFormInput';
import CalculateFormPeople from './CalculateFormPeople';
import CalculateHashName from './CalculateHashName';
import CalculateSlider from './CalculateSlider';
import CalculateAddBtn from './CalculateAddBtn';

class App extends Component {
    constructor(props) {
        super(props);
        this.getData = JSON.parse(localStorage.getItem('state'));
        this.id = 0;
        this.state = {
            input : '',
            date : '',
            allprice: '',
            name: '',
            people : [],
            card : this.getData == null ? [] : this.getData,
        }
    }
    handleChange = (e) => {
        if(e.target.id === "0") {
            this.setState({ input : e.target.value })
        }else if(e.target.id === "1"){
            this.setState({ date : e.target.value })
        }else if(e.target.id === "2"){
            this.setState({ allprice : e.target.value })
        }else if(e.target.id === "3"){
            this.setState({ name : e.target.value })
        }
    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleAddName();
        }
    }
    handleAddName = () => {
        if(this.state.name.length === 0) {
            alert('이름을 입력하세요');
            return;
        } 
        const { people } = this.state;
        const checkName = people.filter((item)=> item.name === this.state.name );

        if(checkName.length > 0){
            alert('같은 이름이 있어요');
            return;
        }
        this.setState({
            name : '',
            people : people.concat({
                id: this.id++,
                name: this.state.name,
                percentage : 100,
                price:0,
                active:false
            })
        });
    }
    handleOnActive = (id) => {
        const { people } = this.state;
        let nextPeople = [...people];
        nextPeople.map((item, i) => item.active = item.id === id ? true : false );
        
        this.setState({
            people : nextPeople
        });

    }
    handleRemoveName = (id) => {
        const confirm = window.confirm('정말 삭제 할꺼에요?');
        if(confirm) {
            const { people } = this.state;
            let nextPeople = [...people];
            nextPeople = nextPeople.filter(item => item.id !== id);
            nextPeople.map((item, i) => item.id = i);
            this.setState({
                people : nextPeople
            });
        }
    };
    handleSliderOnChange = (data) => {
        const { people } = this.state;
        let nextPeople = [...people];
        nextPeople.map((item) => item.active ? item.percentage = data : null );
        this.setState({
            people : nextPeople
        });
    }
    handleOnSave = () => {
        const {allprice, people } = this.state;
        let nextPeople = [...people];
        let percentage = 0;
        people.map((item) => percentage = percentage + item.percentage );
        percentage = percentage/100;
        nextPeople.map((item) => item.price = Math.ceil((allprice/percentage) * (item.percentage/100)/100)*100);
            
        this.setState({
            people : nextPeople
        });
        this.setState({
            input : '',
            date : '',
            allprice: '',
            name: '',
            people : [
            ]
        });
        localStorage.setItem(this.state.input,JSON.stringify(this.state));
        alert('저장완료!');
    }
    render() {
        const { handleChange, handleAddName, handleRemoveName, handleKeyPress, handleOnActive, handleSliderOnChange, handleOnSave } = this;
        const { input, date, allprice, name } = this.state;
        const selectPeople = this.state.people.filter((item) => item.active === true);
        const hashBtn = this.state.people.map((item, i) => <CalculateHashName key={item.id} index={item.id} name={item.name} price={item.price} percentage={item.percentage} active={item.active} handleRemoveName={handleRemoveName} onActive={handleOnActive}/> );
        
        return (
            <PageTemplate>
                <CalculateFormInput value={input} value2={date} value3={allprice} handleChange={handleChange}>
                    <CalculateFormPeople value={name} handleChange={handleChange} handleAddName={handleAddName} handleKeyPress={handleKeyPress}/>
                    { selectPeople.length > 0 && <CalculateSlider selectPeople={selectPeople} handleSliderOnChange={handleSliderOnChange}/> }
                    {hashBtn}
                </CalculateFormInput>
                { this.state.people.length > 0 && <CalculateAddBtn onSave={handleOnSave} /> }
            </PageTemplate>
        );
    }
}

export default App;