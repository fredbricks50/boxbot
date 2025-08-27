@extends('admin.layout.layout')


@section('content')


<!--**********************************
            Content body start
        ***********************************-->
        <div class="content-body">
            <div class="container-fluid">
                <div class="row page-titles mx-0">
                    <div class="col-sm-6 p-md-0">
                        <div class="welcome-text">
                            
                        </div>
                    </div>
                    <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="javascript:void(0)">User</a></li>
                            <li class="breadcrumb-item"><a href="javascript:void(0)">{{ $user['email']}}</a></li>
                            <li class="breadcrumb-item active"><a href="javascript:void(0)">Details</a></li>
                        </ol>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-12">
                    @if(Session::has('success_message'))
                        <div class="alert alert-success" role="alert">
                        {{Session::get('success_message')}}
                        </div>
                    @endif
                    </div>
                </div>
                <div class="row">
                    
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-statistics">
                                    <div class="text-center mt-4 border-bottom-1 pb-3">
                                        <div class="row mb-4">
                                            <div class="col">
                                                <h3 class="m-b-0">@money($details['balance'])</h3><span class="text-dark">Live Balance</span>
                                            </div>
                                            <div class="col">
                                                <h3 class="m-b-0">{{$details['tradingbots']}}</h3><span class="text-dark">bots</span>
                                            </div>
                                            <div class="col-12">
                                                <h3 class="m-b-0">{{ date('d-M-Y', strtotime($user['created_at'])) }}</h3><span class="text-dark">Registered</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                <div class="profile-tab">
                                    <div class="custom-tab-1">
                                        <ul class="nav nav-tabs">
                                            <li class="nav-item"><a href="#my-posts" data-toggle="tab" class="nav-link active show">Bonus</a>
                                            </li>
                                            <li class="nav-item"><a href="#about-me" data-toggle="tab" class="nav-link">Email</a>
                                            </li>
                                            <li class="nav-item"><a href="#deposits" data-toggle="tab" class="nav-link">deposits</a>
                                            </li>
                                            <li class="nav-item"><a href="#withdraws" data-toggle="tab" class="nav-link">Withdraws</a>
                                            </li>
                                            <li class="nav-item"><a href="#investments" data-toggle="tab" class="nav-link">bots</a>
                                            </li>
                                            <li class="nav-item"><a href="#referals" data-toggle="tab" class="nav-link">Referals</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div id="my-posts" class="tab-pane fade active show">
                                                <div class="my-post-content pt-3">
                                                    <form method="post" action="{{ url('admin/viewusers')}}/{{ $user['id'] }}">@CSrf
                                                        <div class="form-group">
                                                            <label for="exampleInputName1">Amount</label>
                                                            <input type="number" value="" step="0.01" pattern="^\d+(?:\.\d{1,2})?$"  class="form-control"  name="amount">
                                                        </div>
                                                        <input type="hidden" name="action" value="bonus">
                                                        <button type="submit" class="btn btn-dark btn-block">Send Bonus</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div id="about-me" class="tab-pane fade">
                                                <div class="about-me-content pt-3">
                                                    <form method="post" action="{{ url('admin/viewusers')}}/{{ $user['id'] }}">@CSrf
                                                        <div class="form-group">
                                                            <label for="exampleInputName1">Subject</label>
                                                            <input type="subject" class="form-control"  name="subject">
                                                            
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="exampleInputName1">message</label>
                                                            <textarea class="form-control" style="height:150px" name="message" placeholder="content"></textarea>
                                                        </div>
                                                        <input type="hidden" name="action" value="email">
                                                        <button type="submit" class="btn btn-dark btn-block">Email</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div id="deposits" class="tab-pane fade">
                                                <div class="about-me-content pt-3">
                                                    <div class="table-responsive">
                                                        <table class="table text-dark student-data-table m-t-20">
                                                            <thead>
                                                                <tr>
                                                                    <th>Amount</th>
                                                                    <th>Gatewayname</th>
                                                                    <th>status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            @forelse ($deposits as $deposit)
                                                                <tr>
                                                                    <td>@money($deposit['amount']) </td>
                                                                    <td>{{$deposit['gatewayname']}} </td>
                                                                    <td> 
                                                                        @if ($deposit['deposit_status'] == 1)
                                                                            <span class='badge badge-success'>Approved</span>
                                                                        @elseif ($deposit['deposit_status'] == 0)
                                                                            <span class='badge badge-danger'>Pending</span>
                                                                        @else
                                                                            <span class='badge badge-secondary'>Profit Exceeded</span>
                                                                        @endif
                                                                    </td>
                                                                </tr>      
                                                                @empty
                                                                <div class="alert alert-danger" role="alert"> No data found</div>
                                                                @endforelse
                                                                
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="withdraws" class="tab-pane fade">
                                                <div class="about-me-content pt-3">
                                                    <div class="table-responsive">
                                                        <table class="table text-dark student-data-table m-t-20">
                                                            <thead>
                                                                <tr>
                                                                    <th>Amount</th>
                                                                    <th>Gatewayname</th>
                                                                    <th>status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            @forelse ($withdraws as $withdraw)
                                                                <tr>
                                                                    <td>@money($withdraw['amount']) </td>
                                                                    <td>{{$withdraw['gatewayname']}} </td>
                                                                    <td> 
                                                                        <span class='badge badge-{{ $withdraw['withdraw_status'] === 'live' ? 'success' : 'danger' }}'>
                                                                            {{ ucfirst($withdraw['withdraw_status']) }}
                                                                        </span>
                                                                    </td>
                                                                </tr>      
                                                                @empty
                                                                <div class="alert alert-danger" role="alert"> No data found</div>
                                                                @endforelse
                                                                
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="investments" class="tab-pane fade">
                                                <div class="about-me-content pt-3">
                                                <div class="table-responsive">
                                                        <table class="table text-dark student-data-table m-t-20">
                                                            <thead>
                                                                <tr>
                                                                    <th>Amount</th>
                                                                    <th>Account type</th>
                                                                    <th>earned</th>
                                                                    <th>status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            @forelse ($tradingbots as $tradingbot)
                                                                <tr>
                                                                    <td>@money($tradingbot['amount']) </td>
                                                                    <td> 
                                                                        <span class='badge badge-{{ $tradingbot['account_type'] === 'live' ? 'success' : 'danger' }}'>
                                                                            {{ strtoupper($tradingbot['account_type']) }}
                                                                        </span>
                                                                    </td>
                                                                    <td>@money($tradingbot['amount_earned']) </td>
                                                                    <td> 
                                                                        @if ($tradingbot['status'] == 1)
                                                                            <span class='badge badge-success'>Active</span>
                                                                        @elseif ($tradingbot['status'] == 0)
                                                                            <span class='badge badge-danger'>Expired</span>
                                                                        @else
                                                                            <span class='badge badge-secondary'>Profit Exceeded</span>
                                                                        @endif
                                                                        
                                                                    </td>
                                                                </tr>      
                                                                @empty
                                                                <div class="alert alert-danger" role="alert"> No data found</div>
                                                                @endforelse
                                                                
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="referals" class="tab-pane fade">
                                                <div class="about-me-content pt-3">
                                                <div class="table-responsive">
                                                        <table class="table text-dark student-data-table m-t-20">
                                                            <thead>
                                                                <tr>
                                                                    <th>Name</th>
                                                                    <th>status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            @forelse ($refers as $refer)
                                                                <tr>
                                                                    <td>{{ $refer['username'] }}</td>
                                                                    <td> 
                                                                        @if ($refer['refearned'] == 1)
                                                                            <span class='badge badge-success'>Refer Earned</span>
                                                                        @else
                                                                        <span class='badge badge-danger'>Refer Not Earned</span>
                                                                        @endif
                                                                        
                                                                    </td>
                                                                </tr>      
                                                                @empty
                                                                <div class="alert alert-danger" role="alert"> No data found</div>
                                                                @endforelse
                                                                
                                                                
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <!--**********************************
            Content body end
        ***********************************-->
   
@endsection