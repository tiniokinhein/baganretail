import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { F_COLOR, L_COLOR, S_COLOR, T_COLOR } from '../../components/Color'
import Layout from '../../components/layout/Layout'
import { db, imgUrl, storage } from '../../helpers/firebase'
import QRCode from 'qrcode.react'
import { MdArrowBack, MdClose } from 'react-icons/md'
import MoonLoader from 'react-spinners/MoonLoader'


class QrProduct extends Component {

    state = {
        p: null,
        catePosts: [],
        unitPosts: [],
        accounts: [],
        title: '',
        description: '',
        image: '',
        categories: [],
        weight: '',
        unit: '',
        inStock: '',
        price: '',
        account: '',
        // user: auth.currentUser,
        previewFile: null,
        balance: '',
        status: '',
        loading: false
    }

    getQrProduct = () => {
        this._isMounted = true

        const { id } = this.props.match.params

        db
        .ref(`products/${id}`)
        .on('value' , (snap) => {
            const data = snap.val()

            if(this._isMounted) {
                this.setState({
                    p: data,
                    title: data ? data.title : '',
                    weight: data ? data.weight : '',
                    inStock: data ? data.inStock : '',
                    balance: data ? data.balance : '',
                    price: data ? data.price : '',
                    unit: data ? data.unit.title : '',
                    image: data ? data.image : '' ,
                    categories: data ? data.categories : [],
                    status: data ? data.status : ''
                })
            }
        })
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
        this.getCategories()
        this.getUnits()
        this.getAccounts()
        this.getQrProduct()
        window.scrollTo(0,0)
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.getQrProduct()
        }
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

    /////////////////////////// FILE CHANGE ////////////////////////////
    fileOnChange = e => {
        this.setState({
            image: e.target.files[0],
            previewFile: URL.createObjectURL(e.target.files[0])
        }, () => {
            const { id } = this.props.match.params
    
            if(this.state.image.name) {
                storage
                .child(this.state.image.name)
                .put(this.state.image, { contentType: 'image/jpeg' })
    
                const data = {
                    image: this.state.image.name
                }
    
                db 
                .ref(`products/${id}`)
                .update(data, () => {
                    // window.location.reload()
                    this.setState({
                        loading: true
                    })
                })
            }
        })
    }
    ////////////////////////////////////////////////////////////////

    editProduct = e => {
        e.preventDefault()

        const { id } = this.props.match.params

        this.setState({
            loading: true
        })

        if(this.state.account) {

            let accountList
            if(this.state.account === '') {
                accountList = null
            } else {
                accountList = JSON.parse(this.state.account.toString())
            }

            const data = {
                user: accountList
            }
    
            db 
            .ref(`products/${id}`)
            .update(data, () => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/products')
                }, 3000)
            })
        }

        if(this.state.status) {

            const data = {
                status: this.state.status
            }
    
            db 
            .ref(`products/${id}`)
            .update(data, () => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/products')
                }, 3000)
            })
        }

        if( this.state.categories !== (this.state.p ? this.state.p.categories : null)) {
            const categoryList = JSON.parse("["+ this.state.categories.toString() +"]") 
    
            const data = {
                categories: categoryList
            }
    
            db 
            .ref(`products/${id}`)
            .update(data, () => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/products')
                }, 3000)
            })
        }
        
        if(this.state.unit !== (this.state.p ? this.state.p.unit.title : null)) {
            
            const unitList = JSON.parse(this.state.unit.toString()) 
    
            const data = {
                unit: unitList
            }
    
            db 
            .ref(`products/${id}`)
            .update(data, () => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/products')
                }, 3000)
            })
        }


        if(
            this.state.account ||
            this.state.status ||
            this.state.image.name
        ) {
            
            const data = {
                edit_date: new Date().toLocaleString(),
                title: this.state.title,
                description: this.state.description,
                weight: this.state.weight,
                inStock: this.state.inStock,
                balance: this.state.balance,
                price: this.state.price                
            }
    
            db 
            .ref(`products/${id}`)
            .update(data, () => {
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/products')
                }, 3000)
            })
        }
    }

    deleteImage = () => {
        const { id } = this.props.match.params

        storage
        .child(`/${this.state.image}`)
        .delete()
        .then(() => {})
        .catch(() => {})

        db 
        .ref(`products/${id}`)
        .update({
            image: ''
        })
    }

    deleteProduct = () => {
        const { id } = this.props.match.params

        this.setState({
            loading: true
        })

        storage
        .child(`/${this.state.image}`)
        .delete()
        .then(() => {})
        .catch(() => {})

        db 
        .ref(`products/${id}`)
        .remove(() => {
            setTimeout(() => {
                this.setState({
                    loading: false
                })
                this.props.history.push('/products')
            }, 3000)
        })
    }

    render() {

        const { 
            p , 
            title , 
            weight , 
            inStock , 
            price , 
            unit , 
            image , 
            balance,

            catePosts,
            unitPosts,
            description,
            accounts,
            account,
            categories,
            previewFile,
            status
        } = this.state

        const cssName = {
            margin: {
              margin: '0 auto'
            }
        }

        const { id } = this.props.match.params

        let filePreview
        if(previewFile) {
            filePreview = (
                <div className="position-relative">
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

        const qrCode = (
            <div className="qrcode">
                <QRCode 
                    value={JSON.stringify({title,id,weight,inStock,price,unit,image,balance})}
                    includeMargin={true}
                />
                <div className="w-100">
                    <button
                        onClick={() => {
                            const canvas = document.querySelector('canvas')
                            const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                            let downloadLink = document.createElement('a')
                            downloadLink.href = pngUrl
                            downloadLink.download = title + '.png'
                            document.body.appendChild(downloadLink)
                            downloadLink.click()
                            document.body.removeChild(downloadLink)
                        }}
                        className="btn rounded border-0 shadow px-3 py-2 mt-3"
                        style={{
                            fontSize: '0.85rem',
                            color: F_COLOR,
                            background: L_COLOR
                        }}
                    >
                        QR Code ဒေါင်းရန်
                    </button>
                </div>
            </div>
        )

        const editLists = p ? (
            <div className="mt-4 pt-4 border-top border-secondary" key={p.id}>
                <form onSubmit={this.editProduct} autoComplete="off">
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
                                image ? (
                                    <div className="position-relative">
                                        <img src={imgUrl + image + '?alt=media'} alt='' width="150" />
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
                                            onClick={() => this.deleteImage()}
                                        >
                                            <MdClose size="1rem" className="text-light" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="d-flex align-items-center productFile">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            value={image}
                                            onChange={this.fileOnChange.bind(this)}
                                            className="text-light rounded-lg border-0 shadow-none p-0 font-weight-normal"
                                            style={{
                                                fontSize: '0.8rem',
                                                height: '40px',
                                                lineHeight: '34px',
                                                background: '#e21921'
                                            }}
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
                                        <span className="text-white-50 ml-3">
                                            <small>
                                                အရှည် - 1000px ၊ အမြင့် - 1000px
                                            </small>
                                        </span>
                                    </div>
                                )
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
                            <p 
                                className="mb-3 text-white"
                                style={{
                                    fontSize: '0.8rem'
                                }}
                            >
                                {p ? (p.categories.length >= 2 ? p.categories.map((m) => m.title + ' ၊ ') : p.categories[0].title) : null}
                            </p>
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
                        <p 
                            className="mb-3 text-white w-100"
                            style={{
                                fontSize: '0.8rem'
                            }}
                        >
                            {p ? p.unit.title : null}
                        </p>
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
                        />
                    </div>
                    <div className="form-group">
                        <label
                            className="mb-3"
                            htmlFor="balance"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            လက်ကျန်
                        </label>
                        <input
                            type="number"
                            name="balance"
                            id="balance"
                            value={balance}
                            onChange={this.handleOnChange.bind(this)}
                            className="form-control bg-transparent border-secondary rounded shadow-none px-3 col-12 col-md-6"
                            style={{
                                color: L_COLOR,
                                height: '50px',
                                fontSize: '0.8rem'
                            }}
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
                    <div className="form-group">
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
                                <option value="none">
                                    {
                                        p.user ? p.user.name : 'ရွေးမယ်'
                                    }
                                </option>
                                {
                                    p.user &&
                                    <option value="null">
                                        မသတ်မှတ်ဘူး
                                    </option>
                                }
                                {
                                    accounts.map((p) => (
                                        <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-5">
                        <label
                            className="mb-3"
                            htmlFor="status"
                            style={{
                                color: L_COLOR,
                                fontSize: '0.9rem'
                            }}
                        >
                            အခြေအနေ
                        </label>
                        <div className="d-flex col-12 col-md-6 px-0">
                            <select
                                name="status"
                                id="status"
                                value={status}
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
                                {
                                    p.status === "တင်ထားဆဲ" ? (
                                        <>
                                            <option value="တင်ထားဆဲ">တင်ထားဆဲ</option>
                                            <option value="အတည်ပြုပြီးပြီ">အတည်ပြုပြီးပြီ</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="အတည်ပြုပြီးပြီ">အတည်ပြုပြီးပြီ</option>
                                            <option value="တင်ထားဆဲ">တင်ထားဆဲ</option>
                                        </>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group mb-0">
                        <button
                            className="btn rounded border-0 shadow px-5 py-0 font-weight-normal mr-3"
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
                        <button
                            className="btn rounded border-0 shadow px-5 py-0 font-weight-normal"
                            style={{
                                fontSize: '0.8rem',
                                color: L_COLOR,
                                background: T_COLOR,
                                lineHeight: 0,
                                height: '45px'
                            }}
                            onClick={this.deleteProduct}
                        >
                            ဖျက်မည်
                        </button>
                    </div>
                </form>
            </div>
        ) : null

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
                                    css={cssName.margin}
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
                    {p ? p.title : null}
                </h4>

                <div 
                    className="my-3 rounded shadow p-4"
                    style={{
                        background: S_COLOR
                    }}
                >
                    {qrCode}
                    {editLists}
                </div>
            </Layout>
        )
    }
}

export default QrProduct