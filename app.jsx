var LISTS = [
	{
		name: "Mercado 1",
		things: [2,2,4,5,2],
		id: 1
	},

	{
		name: "Mercado 2",
		things:[2,2,4,5,2],
		id: 2
	},
	{
		name: "Mercado 3",
		things:[2,2,4,5,2],
		id: 3
	}
];

var nextId = 4;


var AddLists= React.createClass({
	
	getInitialState: function(){
		return{
			name:"",
		};
	},

	onNameChange: function(e){
		this.setState({name:e.target.value});
	},

	onSubmit: function(e){
		e.preventDefault();
		this.props.onAdd(this.state.name);
		this.setState({name: ""});
	},

	render: function() {
		return(
			<div className = "add-lists-form">
				<p>Ingrese su lista: </p>
				<form onSubmit={this.onSubmit}>
					<input type="text" value={this.state.name} onChange={this.onNameChange} className = "text" />
					<input type="submit" value="+" className = "button"/>
				</form>
			</div>
		);
	}

});

var AddThings= React.createClass({
	
	getInitialState: function(){
		return{
			things:"",
		};
	},

	onThingsChange: function(e){
		this.setState({things:e.target.value});
	},

	onSubmit: function(e){
		e.preventDefault();
		this.props.onAdd(this.state.things);
		this.setState({things: ""});
	},

	render: function() {
		return(
			<div className = "add-things-form">
				<form onSubmit={this.onSubmit}>
					<input type="text" value={this.state.things} onChange={this.onThingsChange} className = "text" />
					<input type="submit" value="+" className = "button"/>
				</form>
			</div>
		);
	}

});

/*var At= React.createClass({

	getInitialState: function(){
		return{
			things: this.props.things
		};
	},

	onAdd: function(things){
		var next = props.things.length();
		this.state.things.push({
			things: things,
		});
		this.setState(this.state);
		next+=1;
	},

	render: function(){
		return(
			<AddThings/>
		);
	}
});*/


var List = function(props){
	return(	
		<div className="lists">
			<ul>
				<li>
				<a href= "#" id="link">{props.name}</a>
				<div className = "wrapper">
					<AddThings/> 
					{props.things.map(function(element,index){
						return(
							<Things numbers={element} key={index}/>		
						);
					}.bind(this))}
				</div>
				</li>
			</ul> 
		</div>
)};



var Things = function(props){
	return(
		<div className="things">
			<ul>
				<li>{props.numbers}</li>
			</ul>
		</div>
)};

var Header = function(props){
	return(
		<div className = "header">
			<h1>{props.title}</h1>
		</div>
		);
};

var HeaderList = function(props){
	return(
		<div className = "header-list">	
			<h2>{props.theader}</h2>
		</div>
	);
};



var App = React.createClass({

	getDefaultProps: function(){
		return{
			title: "ODOT",
			theader: "Listas registradas"
		};
	},

	getInitialState: function(){
		return{
			lists: this.props.lists
		};
	},

	onAdd: function(name){
		this.state.lists.push({
			name: name,
			things:[],
			id: nextId,
		});
		this.setState(this.state);
		nextId+=1;
	},

	render: function(){
		var lists = this.props.lists;
		return(
				<div className = "body">
					<div className = "box-header">
						<Header title = {this.props.title}/>
					</div>
					<div className = "list-menu">
						<HeaderList theader = {this.props.theader}/>
						<AddLists onAdd={this.onAdd}/>	
						{lists.map(function(element){
							return(
								<List name={element.name} key={element.id} things={element.things}/>
							);
						}.bind(this))}
					</div>
				</div>	
		);
	}
});


ReactDOM.render(<App lists={LISTS}/>, document.getElementById('container'));

