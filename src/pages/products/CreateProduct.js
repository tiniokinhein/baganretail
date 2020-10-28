import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import { auth, db, storage } from '../../helpers/firebase'
import { MdArrowBack, MdClose } from 'react-icons/md'
import { F_COLOR, L_COLOR, S_COLOR } from '../../components/Color'
import { v4 as uuidv4 } from 'uuid'
import MoonLoader from 'react-spinners/ClipLoader'

class CreateProduct extends Component {

    _isMounted = false

    state = {
        title: '',
        description: '',
        image: '',
        categories: [],
        weight: '',
        unit: '',
        inStock: '',
        price: '',
        user: auth.currentUser,
        catePosts: [],
        unitPosts: [],
        previewFile: null,
        account: '',
        accounts: [],
        loading: false
    }

    getCategories = () => {
        this._isMounted = true

        db
        .ref('categories')
        .orderByChild('title')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                const id = snap.key
                const value = snap.val()
                lists.push({
                    id,
                    ...value
                })
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    catePosts: data
                })
            }

        })
    }

    getUnits = () => {
        this._isMounted = true

        db
        .ref('units')
        .orderByChild('title')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                const id = snap.key
                const value = snap.val()
                lists.push({
                    id,
                    ...value
                })
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    unitPosts: data
                })
            }

        })
    }

    getAccounts = () => {
        this._isMounted = true

        db
        .ref('users')
        .orderByChild('title')
        .on('value', (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                const id = snap.key
                const value = snap.val()
                lists.push({
                    id,
                    ...value
                })
            })

            const data = lists

            if(this._isMounted) {
                this.setState({
                    accounts: data
                })
            }

        })
    }

    componentDidMount() {
        this._isMounted = true

        auth.onAuthStateChanged((user) => {
            if(user) {
                if(this._isMounted) {
                    this.setState({
                        user: auth.currentUser
                    })
                }
            } else {
                if(this._isMounted) {
                    this.setState({
                        user: null
                    })
                }
            }
        })

        this.getCategories()
        this.getUnits()
        this.getAccounts()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleMultipleSelect = e => {
        this.setState({
            categories: Array.from(e.target.selectedOptions, (item) => item.value)
        })
    }

    fileOnChange = e => {
        this.setState({
            image: e.target.files[0],
            previewFile: URL.createObjectURL(e.target.files[0])
        })
    }

    resetField = () => {
        this._isMounted = true

        if(this._isMounted) {
            this.setState({
                title: '',
                description: '',
                image: '',
                categories: '',
                weight: '',
                unit: '',
                inStock: '',
                price: '',
                previewFile: null,
                account: ''
            })
        }
    }

    createProduct = e => {
        e.preventDefault()

        this.setState({
            loading: true
        })

        const categoryList = JSON.parse("["+ this.state.categories.toString() +"]") 
        const unitList = JSON.parse(this.state.unit.toString()) 

        let accountList
        if(this.state.account === '') {
            accountList = null
        } else {
            accountList = JSON.parse(this.state.account.toString())
        }

        storage
        .child(this.state.image.name)
        .put(this.state.image, { contentType: 'image/jpeg' })

        const data = {
            date: new Date().toLocaleString(),
            id: uuidv4(),
            title: this.state.title,
            description: this.state.description,
            image: this.state.image.name,
            categories: categoryList,
            weight: this.state.weight,
            unit: unitList,
            inStock: this.state.inStock,
            balance: this.state.inStock,
            price: this.state.price,
            status: 'အတည်ပြုပြီးပြီ',
            user: accountList
        }

        db 
        .ref(`products/${data.id}`)
        .set(data, () => {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
                this.resetField()
                this.props.history.push('/products')
            }, 5000)
        })
    }

    render() {

        const { 
            title , 
            description , 
            image , 
            categories , 
            weight ,
            unit , 
            inStock , 
            price ,
            catePosts , 
            unitPosts , 
            previewFile,
            account,
            accounts
        } = this.state

        let filePreview
        if(previewFile) {
            filePreview = (
                <div className="position-relative col-12 col-md-6 px-0">
                    <img src={previewFile} alt='' width="150" />
                    <button
                        className="btn rounded-circle text-center border-0 p-0 shadow-none position-absolute"
                        style={{
                            width: '24px',
                            height: '24px',
                            lineHeight: 0,
                            top: '-12px',
                            left: '138px',
                            background: '#000'
                        }}
                        onClick={() => {
                            this.setState({
                                previewFile: null,
                                image: ''
                            })
                        }}
                    >
                        <MdClose size="1rem" className="text-light" />
                    </button>
                </div>
            )
        }

        const formList = (
            <div className="px-2">
                <form onSubmit={this.createProduct} autoComplete="off">
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="title"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            ခေါင်းစဥ်
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control bg-transparent border-secondary rounded shadow-none px-3 col-12 col-md-6"
                            style={{
                                color: L_COLOR,
                                height: '50px',
                                fontSize: '0.8rem'
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="image"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            ပုံ
                        </label>
                        {
                            previewFile === null ? (
                                <div className="d-flex align-items-center col-12 col-md-6 px-0 productFile">
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        value={image}
                                        onChange={this.fileOnChange.bind(this)}
                                        className="form-control p-0 m-0 border-0"
                                        style={{
                                            color: L_COLOR,
                                            fontSize: '0.8rem'
                                        }}
                                        required
                                    />
                                    <label
                                        className="mb-0 font-weight-normal text-dark btn-2 rounded-lg py-2 px-4"
                                        htmlFor="image"
                                        style={{
                                            fontSize: '0.7rem',
                                            lineHeight: '1.6',
                                            background: L_COLOR,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ရွေးမယ်
                                    </label>
                                    <span className="text-white-50 ml-3" style={{fontSize:'0.8rem'}}>
                                        <small>
                                            အရှည် - 1000px ၊ အမြင့် - 1000px
                                        </small>
                                    </span>
                                </div>
                            ) : filePreview
                        }
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="categories"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            အမျိုးအစား
                        </label>
                        <div className="col-12 col-md-6 px-0">
                            <select
                                name="categories"
                                id="categories"
                                value={categories}
                                onChange={this.handleMultipleSelect.bind(this)}
                                className="custom-select bg-transparent border-secondary rounded shadow-none p-3"
                                style={{
                                    color: L_COLOR,
                                    fontSize: '0.8rem',
                                    overflowY: 'visible'
                                }}
                                required
                                multiple={true}
                            >
                                {
                                    catePosts.map((p) => (
                                        <option key={p.id} value={JSON.stringify(p)}>{p.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="units"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            အလေးချိန်
                        </label>
                        <div className="d-flex col-12 col-md-6 px-0">
                            <input
                                type="number"
                                name="weight"
                                id="weight"
                                value={weight}
                                onChange={this.handleOnChange.bind(this)}
                                className="form-control bg-transparent border-secondary rounded shadow-none px-3"
                                style={{
                                    color: L_COLOR,
                                    height: '50px',
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                            <select
                                name="unit"
                                id="unit"
                                value={unit}
                                onChange={this.handleOnChange.bind(this)}
                                interface="popover"
                                className="custom-select border-secondary rounded shadow-none px-3 ml-1"
                                style={{
                                    fontSize: '0.8rem',
                                    height: '50px',
                                    lineHeight: 2,
                                    color: F_COLOR,
                                    backgroundColor: L_COLOR
                                }}
                                required
                            >
                                <option value="none">ရွေးမယ်</option>
                                {
                                    unitPosts.map((p) => (
                                        <option key={p.id} value={JSON.stringify(p)}>{p.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="inStock"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            အရေအတွက်
                        </label>
                        <input
                            type="number"
                            name="inStock"
                            id="inStock"
                            value={inStock}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control bg-transparent border-secondary rounded shadow-none px-3 col-12 col-md-6"
                            style={{
                                color: L_COLOR,
                                height: '50px',
                                fontSize: '0.8rem'
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3 w-100"
                            htmlFor="price"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            စျေးနှုန်း <small>( ကျပ် )</small>
                        </label>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            value={price}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control bg-transparent border-secondary rounded shadow-none px-3 col-12 col-md-6"
                            style={{
                                color: L_COLOR,
                                height: '50px',
                                fontSize: '0.8rem'
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="description"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            အကြောင်းအရာ
                        </label>
                        <textarea
                            cols="3"
                            name="description"
                            id="description"
                            value={description}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control bg-transparent border-secondary rounded shadow-none p-3 col-12 col-md-6"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.8rem'
                            }}
                        />
                    </div>
                    <div className="form-group mb-4">
                        <label
                            className="mb-3"
                            htmlFor="account"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            အကောင့်
                        </label>
                        <div className="d-flex col-12 col-md-6 px-0">
                            <select
                                name="account"
                                id="account"
                                value={account}
                                onChange={this.handleOnChange.bind(this)}
                                className="custom-select border-secondary rounded shadow-none px-3"
                                style={{
                                    fontSize: '0.8rem',
                                    height: '50px',
                                    lineHeight: 2,
                                    color: F_COLOR,
                                    backgroundColor: L_COLOR
                                }}
                            >
                                <option value="none">ရွေးမယ်</option>
                                {
                                    accounts.map((p) => (
                                        <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-0">
                        <button
                            className="btn rounded border-0 shadow px-5 py-0 font-weight-normal"
                            style={{
                                fontSize: '0.8rem',
                                color: F_COLOR,
                                background: L_COLOR,
                                lineHeight: 0,
                                height: '45px'
                            }}
                        >
                            သိမ်းမည်
                        </button>
                    </div>
                </form>
            </div>
        )
        
        return (
            <Layout>

                {
                    this.state.loading && 
                    <div 
                        className="position-fixed"
                        style={{
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(29,45,80,0.62)',
                            zIndex: 9999
                        }}
                    >
                        <div className="d-table w-100 h-100">
                            <div className="d-table-cell align-middle text-center">
                                <MoonLoader
                                    size={20}
                                    color={"#fff"}
                                    loading={this.state.loading}
                                />
                            </div>
                        </div>
                    </div>
                }

                <h4
                    className="my-4 m-md-0 s-device-header font-weight-normal position-absolute"
                    style={{
                        top: '1.2rem',
                        fontSize: '1rem',
                        color: L_COLOR
                    }}
                >
                    <Link to="/products" className="text-decoration-none mr-4" style={{color:L_COLOR}}>
                        <MdArrowBack size="1.6rem" />
                    </Link>
                    အသစ်ထည့်မည်
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR
                    }}
                >
                    {formList}
                </div>
            </Layout>
        )
    }
}

export default withRouter(CreateProduct)