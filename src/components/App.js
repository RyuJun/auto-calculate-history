import React, { Component, Fragment } from 'react';
import PageTemplate from './PageTemplate'
import CalculateFormInput from './CalculateFormInput';
import CalculateFormPeople from './CalculateFormPeople';
import CalculateHashName from './CalculateHashName';
import CalculateSlider from './CalculateSlider';
import CalculateAddBtn from './CalculateAddBtn';
import CalculateCard from './CalculateCard';
import CalculateFilter from './CalculateFilter';

import CreateBy from './CreateBy';

class App extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
        this.state = {
            filter: 'all',
            id : 0,
            input : '',
            date : '',
            allprice: '',
            name: '',
            people : [],
            card : this.getData(),
        }
    }
    getData = () => {
        let cardData = [];
        this.id = 0;
        if(localStorage.getItem(`cardList`) !== null){
            cardData = JSON.parse(localStorage.getItem(`cardList`))
        }
        return cardData;
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
            id : this.state.card.length+1,
            name : '',
            people : people.concat({
                id: this.id++,
                name: this.state.name,
                percentage : 100,
                price:0,
                checked:false,
                active:false
            })
        });
    }
    handleOnActive = (id) => {
        const { people } = this.state;
        let nextPeople = [...people];
        nextPeople.map((item) => item.active = item.id === id ? true : false );
        
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
    handleOnSave = (type) => {
        const {allprice, people, card } = this.state;
        if(type){
            let nextCard = [...card];            
            nextCard.map((item) => item.active = false );
            localStorage.setItem(`cardList`,JSON.stringify(nextCard));
            this.setState({
                input : '',
                date : '',
                allprice: '',
                name: '',
                card: this.getData(),
                people : []
            });
            alert('저장완료!');
        }else{
            let localStorageObj = [];
            let nextPeople = [...people];
            let percentage = 0;
            people.map((item) => percentage = percentage + item.percentage );
            percentage = percentage/100;
            nextPeople.map((item) => {
                item.active = false;
                return item.price = Math.ceil((allprice/percentage) * (item.percentage/100)/100)*100;
            });
            this.setState({
                card : [],
                people : nextPeople
            },() => {
                if(localStorage.getItem(`cardList`) !== null){
                    localStorageObj = JSON.parse(localStorage.getItem(`cardList`))
                }
                localStorageObj.push(this.state);
                localStorageObj.reverse();
                localStorageObj.map((item, i) => item.id = i+1);
                localStorage.setItem(`cardList`,JSON.stringify(localStorageObj));
                this.setState({
                    input : '',
                    date : '',
                    allprice: '',
                    name: '',
                    card: this.getData(),
                    people : []
                });
            });
            alert('저장완료!');
        }
    }
    handleOnCompletion = (id) => {
        const confirm = window.confirm('정산이 완료되면 내역확인만 가능해요. 계속 진행할까요?');
        if(confirm) {
            const { card } = this.state;
            let nextCard = [...card];
            nextCard.forEach((item) => {
                if(item.id === id) {
                    item.active = false;
                    item.completion = true;   
                }
            })

            this.setState({
                card : nextCard 
            },()=> {
                localStorage.setItem(`cardList`,JSON.stringify(this.state.card));
                this.setState({
                    input : '',
                    date : '',
                    allprice: '',
                    name: '',
                    card: this.getData(),
                    people : []
                });
            });
        }
    }
    handleOnActiveList = (id, active) => {
        const selectCard = this.state.card;
        if(!active){
            selectCard.map((item) => item.active = false );
        }else{
            selectCard.map((item) => item.active = item.id === id ? true : false );
        }
        this.setState({
            card : selectCard 
        });
    }
    handleRemove = (index) => {
        const confirm = window.confirm('정말 삭제 할꺼에요?');
        if(confirm) {
            const { card } = this.state;
            let nextCard = [...card];
            nextCard = nextCard.filter(item => item.id !== index+1);
            nextCard.map((item, i) => item.id = i+1);
            this.setState({
                card : nextCard
            },() => {
                localStorage.setItem(`cardList`,JSON.stringify(this.state.card));
            });    
        }
    }
    handleChecked = (index, id) => {
        const { card } = this.state;
        let nextCard = [...card];
        const selectCard = nextCard.filter(( item ) => item.id === index+1 )[0];
        selectCard.people.map((item) => {
            if(item.id === id){
                if(item.checked){
                   item.checked = false;
                }else{
                   item.checked = true;
                }
            }
            return item.checked;
        });
        nextCard[index] = selectCard;
        this.setState({
            card : nextCard
        })
    }
    handleFilter = (type) =>{
        this.setState({ filter:type });
    }
    handleClipboard = () => {
        let t = document.createElement("textarea");
        document.body.appendChild(t);
        t.value = 'ghew401@naver.com';
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
        alert('클립보드로 복사 되었습니다.');
    }
    render() {
        const { handleChange, handleAddName, handleRemoveName, handleKeyPress, handleOnActive, handleSliderOnChange, handleOnSave, handleOnActiveList, handleChecked, handleOnCompletion, handleFilter, handleRemove, handleClipboard } = this;
        const { input, date, allprice, name, filter, card } = this.state;
        const selectPeople = this.state.people.filter((item) => item.active === true);
        const hashBtn = this.state.people.map((item) => <CalculateHashName key={item.id} index={item.id} name={item.name} price={item.price} percentage={item.percentage} active={item.active} handleRemoveName={handleRemoveName} onActive={handleOnActive}/> );
        const cardSetting = card.map((item, i) => {
            if(filter === 'all'){
                return <CalculateCard key={i} index={i} allprice={item.allprice} completion={item.completion} date={item.date} input={item.input} people={item.people} active={item.active} changeActive={handleOnActiveList} handleChecked={handleChecked} onSave={handleOnSave} onCompletion={handleOnCompletion} onRemove={handleRemove} />
            }else if(filter === 'progress'){
                if(!item.completion){
                    return <CalculateCard key={i} index={i} allprice={item.allprice} completion={item.completion} date={item.date} input={item.input} people={item.people} active={item.active} changeActive={handleOnActiveList} handleChecked={handleChecked} onSave={handleOnSave} onCompletion={handleOnCompletion}  onRemove={handleRemove}/>
                }
            }else if(filter === 'close'){
                if(item.completion){
                    return <CalculateCard key={i} index={i} allprice={item.allprice} completion={item.completion} date={item.date} input={item.input} people={item.people} active={item.active} changeActive={handleOnActiveList} handleChecked={handleChecked} onSave={handleOnSave} onCompletion={handleOnCompletion}  onRemove={handleRemove}/>
                }
            }
            return null;
        });
        return (
            <Fragment>
                <CalculateFilter filterChange={handleFilter} type={filter}/>
                <PageTemplate>
                    <CalculateFormInput value={input} value2={date} value3={allprice} handleChange={handleChange}>
                        <CalculateFormPeople value={name} handleChange={handleChange} handleAddName={handleAddName} handleKeyPress={handleKeyPress}/>
                        { selectPeople.length > 0 && <CalculateSlider selectPeople={selectPeople} handleSliderOnChange={handleSliderOnChange}/> }
                        {hashBtn}
                    </CalculateFormInput>
                    { this.state.people.length > 0 && <CalculateAddBtn onSave={handleOnSave} /> }
                </PageTemplate>
                {cardSetting}
                <CreateBy handleClipboard={handleClipboard}/>
            </Fragment>
        );
    }
}

export default App;