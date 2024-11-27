const idlFactory = ({ IDL }) => {
    const CandyValue = IDL.Rec();
    const OfferId = IDL.Nat;
    const BlockIndex = IDL.Nat64;
    const Result_6 = IDL.Variant({ 'ok' : BlockIndex, 'err' : IDL.Text });
    const TokenIdentifier = IDL.Text;
    const AddCart = IDL.Record({
      'nftUrl' : IDL.Text,
      'tokenIdentifier' : TokenIdentifier,
      'nftName' : IDL.Text,
    });
    const Result_5 = IDL.Variant({
      'ok' : TokenIdentifier,
      'err' : IDL.Tuple(TokenIdentifier, IDL.Text),
    });
    const TokenSpec = IDL.Record({
      'fee' : IDL.Nat64,
      'canister' : IDL.Text,
      'decimal' : IDL.Nat,
      'symbol' : IDL.Text,
    });
    const AccountIdentifier = IDL.Text;
    const User = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : AccountIdentifier,
    });
    const TokenSpec__2 = IDL.Record({
      'fee' : IDL.Nat64,
      'canister' : IDL.Text,
      'decimal' : IDL.Nat,
      'symbol' : IDL.Text,
    });
    const TokenIdentifier__1 = IDL.Text;
    const Err__1 = IDL.Variant({
      'msgandBidder' : IDL.Tuple(IDL.Principal, IDL.Principal),
      'offerExpired' : IDL.Null,
      'auctionFail' : IDL.Null,
      'nftNotAuction' : IDL.Null,
      'other' : IDL.Tuple(TokenIdentifier__1, IDL.Text),
      'kycNotPass' : IDL.Null,
      'nftAlreadyListing' : IDL.Null,
      'notFoundOffer' : IDL.Null,
      'nftNotlist' : IDL.Null,
      'nftlockedByOther' : IDL.Null,
      'amlNotPass' : IDL.Null,
      'kycorAmlNotPass' : IDL.Null,
    });
    const BatchTradeResult = IDL.Variant({
      'ok' : IDL.Vec(
        IDL.Record({
          'tid' : IDL.Nat,
          'token' : TokenSpec__2,
          'price' : IDL.Nat64,
        })
      ),
      'err' : Err__1,
    });
    const Price__1 = IDL.Nat64;
    const NewFixed = IDL.Record({
      'token' : TokenSpec__2,
      'tokenIdentifier' : TokenIdentifier__1,
      'price' : Price__1,
    });
    const ListResult = IDL.Variant({ 'ok' : TokenIdentifier__1, 'err' : Err__1 });
    const UserId__1 = IDL.Principal;
    const AccountIdentifier__1 = IDL.Text;
    const Err = IDL.Variant({
      'NotList' : IDL.Null,
      'NotSell' : IDL.Null,
      'VerifyTxErr' : IDL.Null,
      'CannotNotify' : AccountIdentifier__1,
      'InsufficientBalance' : IDL.Null,
      'TxNotFound' : IDL.Null,
      'DuplicateHeight' : IDL.Null,
      'InvalidToken' : TokenIdentifier,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier__1,
      'Other' : IDL.Text,
    });
    const BatchVerifyResult = IDL.Variant({
      'ok' : IDL.Vec(TokenIdentifier),
      'err' : Err,
    });
    const TradeType = IDL.Variant({
      'fixed' : IDL.Null,
      'dutchAuction' : IDL.Null,
      'offer' : IDL.Null,
      'auction' : IDL.Null,
    });
    const User__1 = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : AccountIdentifier,
    });
    const Order = IDL.Record({
      'fee' : IDL.Record({
        'platform' : IDL.Record({ 'fee' : IDL.Nat64, 'precision' : IDL.Nat64 }),
        'royalties' : IDL.Record({ 'fee' : IDL.Nat64, 'precision' : IDL.Nat64 }),
      }),
      'token' : TokenSpec__2,
      'tokenIdentifier' : TokenIdentifier__1,
      'tradeType' : TradeType,
      'memo' : IDL.Nat64,
      'time' : IDL.Int,
      'seller' : User__1,
      'buyer' : User__1,
      'price' : Price__1,
    });
    const TradeResult = IDL.Variant({ 'ok' : Order, 'err' : Err__1 });
    const TokenIdentifier__3 = IDL.Text;
    const Price__3 = IDL.Nat64;
    const StatsListings = IDL.Record({
      'tokenIdentifier' : TokenIdentifier__3,
      'price' : Price__3,
    });
    const Time = IDL.Int;
    const Price = IDL.Nat64;
    const Img__1 = IDL.Text;
    const Links = IDL.Record({
      'twitter' : IDL.Opt(IDL.Text),
      'instagram' : IDL.Opt(IDL.Text),
      'discord' : IDL.Opt(IDL.Text),
      'yoursite' : IDL.Opt(IDL.Text),
      'telegram' : IDL.Opt(IDL.Text),
      'medium' : IDL.Opt(IDL.Text),
    });
    const Royality = IDL.Record({ 'rate' : IDL.Nat64, 'precision' : IDL.Nat64 });
    const Category = IDL.Text;
    const ICTokenSpec = IDL.Record({
      'fee' : IDL.Nat,
      'decimals' : IDL.Nat,
      'canister' : IDL.Principal,
      'standard' : IDL.Variant({
        'ICRC1' : IDL.Null,
        'EXTFungible' : IDL.Null,
        'DIP20' : IDL.Null,
        'Ledger' : IDL.Null,
      }),
      'symbol' : IDL.Text,
    });
    const Property = IDL.Record({
      'value' : CandyValue,
      'name' : IDL.Text,
      'immutable' : IDL.Bool,
    });
    CandyValue.fill(
      IDL.Variant({
        'Int' : IDL.Int,
        'Nat' : IDL.Nat,
        'Empty' : IDL.Null,
        'Nat16' : IDL.Nat16,
        'Nat32' : IDL.Nat32,
        'Nat64' : IDL.Nat64,
        'Blob' : IDL.Vec(IDL.Nat8),
        'Bool' : IDL.Bool,
        'Int8' : IDL.Int8,
        'Nat8' : IDL.Nat8,
        'Nats' : IDL.Variant({
          'thawed' : IDL.Vec(IDL.Nat),
          'frozen' : IDL.Vec(IDL.Nat),
        }),
        'Text' : IDL.Text,
        'Bytes' : IDL.Variant({
          'thawed' : IDL.Vec(IDL.Nat8),
          'frozen' : IDL.Vec(IDL.Nat8),
        }),
        'Int16' : IDL.Int16,
        'Int32' : IDL.Int32,
        'Int64' : IDL.Int64,
        'Option' : IDL.Opt(CandyValue),
        'Floats' : IDL.Variant({
          'thawed' : IDL.Vec(IDL.Float64),
          'frozen' : IDL.Vec(IDL.Float64),
        }),
        'Float' : IDL.Float64,
        'Principal' : IDL.Principal,
        'Array' : IDL.Variant({
          'thawed' : IDL.Vec(CandyValue),
          'frozen' : IDL.Vec(CandyValue),
        }),
        'Class' : IDL.Vec(Property),
      })
    );
    const TokenSpec__1 = IDL.Variant({
      'ic' : ICTokenSpec,
      'extensible' : CandyValue,
    });
    const OgyInfo = IDL.Record({
      'fee' : IDL.Record({ 'rate' : IDL.Nat64, 'precision' : IDL.Nat64 }),
      'creator' : IDL.Principal,
      'token' : TokenSpec__1,
      'owner' : IDL.Principal,
      'totalFee' : IDL.Record({ 'rate' : IDL.Nat64, 'precision' : IDL.Nat64 }),
    });
    const Standard = IDL.Variant({ 'ext' : IDL.Null, 'ogy' : OgyInfo });
    const CollectionInit = IDL.Record({
      'url' : IDL.Opt(IDL.Text),
      'featured' : IDL.Opt(Img__1),
      'logo' : IDL.Opt(Img__1),
      'name' : IDL.Opt(IDL.Text),
      'banner' : IDL.Opt(Img__1),
      'description' : IDL.Opt(IDL.Text),
      'links' : IDL.Opt(Links),
      'isVisible' : IDL.Bool,
      'royalties' : Royality,
      'category' : IDL.Opt(Category),
      'standard' : Standard,
      'releaseTime' : IDL.Opt(Time),
      'openTime' : IDL.Opt(Time),
    });
    const CollectionErr = IDL.Variant({
      'perMaxCollNum' : IDL.Null,
      'guestCannotCreateCollection' : IDL.Null,
      'maxCollNum' : IDL.Null,
    });
    const Result_4 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : CollectionErr });
    const Img = IDL.Text;
    const NewProfile = IDL.Record({
      'bio' : IDL.Text,
      'userName' : IDL.Text,
      'banner' : Img,
      'notification' : IDL.Vec(IDL.Text),
      'email' : IDL.Text,
      'avatar' : Img,
    });
    const ProfileErr = IDL.Variant({
      'alreadyCreate' : IDL.Null,
      'noProfile' : IDL.Null,
      'defaultAccount' : IDL.Null,
    });
    const Result_3 = IDL.Variant({ 'ok' : IDL.Null, 'err' : ProfileErr });
    const OfferStatus = IDL.Variant({
      'expired' : IDL.Null,
      'rejected' : IDL.Null,
      'ineffect' : IDL.Null,
      'accepted' : IDL.Null,
    });
    const OfferId__1 = IDL.Nat;
    const Offer = IDL.Record({
      'ttl' : IDL.Int,
      'status' : OfferStatus,
      'token' : TokenSpec__2,
      'tokenIdentifier' : TokenIdentifier__1,
      'time' : Time,
      'seller' : User__1,
      'price' : Price__1,
      'offerId' : OfferId__1,
      'bidder' : IDL.Principal,
    });
    const TokenIdentifier__4 = IDL.Text;
    const UserId__2 = IDL.Principal;
    const OfferId__2 = IDL.Nat;
    const ProfileLet = IDL.Record({
      'bio' : IDL.Text,
      'userName' : IDL.Text,
      'created' : IDL.Vec(TokenIdentifier__4),
      'favorited' : IDL.Vec(TokenIdentifier__4),
      'userId' : UserId__2,
      'time' : Time,
      'banner' : Img,
      'notification' : IDL.Vec(IDL.Text),
      'offersReceived' : IDL.Vec(OfferId__2),
      'collections' : IDL.Vec(IDL.Principal),
      'email' : IDL.Text,
      'collected' : IDL.Vec(TokenIdentifier__4),
      'offersMade' : IDL.Vec(OfferId__2),
      'followeds' : IDL.Vec(UserId__2),
      'followers' : IDL.Vec(UserId__2),
      'avatar' : Img,
    });
    const Result_2 = IDL.Variant({ 'ok' : ProfileLet, 'err' : ProfileErr });
    const User__2 = IDL.Variant({
      'principal' : IDL.Principal,
      'address' : AccountIdentifier,
    });
    const Price__2 = IDL.Nat64;
    const Fee = IDL.Record({ 'platform' : Price__2, 'royalties' : Price__2 });
    const TokenSpec__3 = IDL.Record({
      'fee' : IDL.Nat64,
      'canister' : IDL.Text,
      'decimal' : IDL.Nat,
      'symbol' : IDL.Text,
    });
    const TokenIdentifier__2 = IDL.Text;
    const Fixed = IDL.Record({
      'fee' : Fee,
      'token' : TokenSpec__3,
      'tokenIdentifier' : TokenIdentifier__2,
      'seller' : IDL.Principal,
      'price' : Price__2,
    });
    const DutchAuction = IDL.Record({
      'fee' : Fee,
      'startTime' : Time,
      'token' : TokenSpec__3,
      'tokenIdentifier' : TokenIdentifier__2,
      'reduceTime' : IDL.Nat64,
      'endTime' : Time,
      'floorPrice' : Price__2,
      'seller' : IDL.Principal,
      'reducePrice' : Price__2,
      'payee' : User__2,
      'startPrice' : Price__2,
    });
    const Auction = IDL.Record({
      'fee' : Fee,
      'ttl' : IDL.Int,
      'highestBidder' : IDL.Opt(IDL.Principal),
      'tokenIdentifier' : TokenIdentifier__2,
      'seller' : IDL.Principal,
      'resevePrice' : IDL.Opt(Price__2),
      'highestPrice' : IDL.Opt(Price__2),
      'startPrice' : Price__2,
    });
    const Listing = IDL.Variant({
      'fixed' : Fixed,
      'dutchAuction' : DutchAuction,
      'unlist' : IDL.Null,
      'auction' : Auction,
    });
    const definite_canister_settings = IDL.Record({
      'freezing_threshold' : IDL.Nat,
      'controllers' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'memory_allocation' : IDL.Nat,
      'compute_allocation' : IDL.Nat,
    });
    const StatusRequest = IDL.Record({
      'memory_size' : IDL.Bool,
      'cycles' : IDL.Bool,
      'heap_memory_size' : IDL.Bool,
    });
    const MetricsGranularity = IDL.Variant({
      'hourly' : IDL.Null,
      'daily' : IDL.Null,
    });
    const GetMetricsParameters = IDL.Record({
      'dateToMillis' : IDL.Nat,
      'granularity' : MetricsGranularity,
      'dateFromMillis' : IDL.Nat,
    });
    const MetricsRequest = IDL.Record({ 'parameters' : GetMetricsParameters });
    const GetLogMessagesFilter = IDL.Record({
      'analyzeCount' : IDL.Nat32,
      'messageRegex' : IDL.Opt(IDL.Text),
      'messageContains' : IDL.Opt(IDL.Text),
    });
    const Nanos = IDL.Nat64;
    const GetLogMessagesParameters = IDL.Record({
      'count' : IDL.Nat32,
      'filter' : IDL.Opt(GetLogMessagesFilter),
      'fromTimeNanos' : IDL.Opt(Nanos),
    });
    const GetLatestLogMessagesParameters = IDL.Record({
      'upToTimeNanos' : IDL.Opt(Nanos),
      'count' : IDL.Nat32,
      'filter' : IDL.Opt(GetLogMessagesFilter),
    });
    const CanisterLogRequest = IDL.Variant({
      'getMessagesInfo' : IDL.Null,
      'getMessages' : GetLogMessagesParameters,
      'getLatestMessages' : GetLatestLogMessagesParameters,
    });
    const GetInformationRequest = IDL.Record({
      'status' : IDL.Opt(StatusRequest),
      'metrics' : IDL.Opt(MetricsRequest),
      'logs' : IDL.Opt(CanisterLogRequest),
      'version' : IDL.Bool,
    });
    const StatusResponse = IDL.Record({
      'memory_size' : IDL.Opt(IDL.Nat64),
      'cycles' : IDL.Opt(IDL.Nat64),
      'heap_memory_size' : IDL.Opt(IDL.Nat64),
    });
    const UpdateCallsAggregatedData = IDL.Vec(IDL.Nat64);
    const CanisterHeapMemoryAggregatedData = IDL.Vec(IDL.Nat64);
    const CanisterCyclesAggregatedData = IDL.Vec(IDL.Nat64);
    const CanisterMemoryAggregatedData = IDL.Vec(IDL.Nat64);
    const HourlyMetricsData = IDL.Record({
      'updateCalls' : UpdateCallsAggregatedData,
      'canisterHeapMemorySize' : CanisterHeapMemoryAggregatedData,
      'canisterCycles' : CanisterCyclesAggregatedData,
      'canisterMemorySize' : CanisterMemoryAggregatedData,
      'timeMillis' : IDL.Int,
    });
    const NumericEntity = IDL.Record({
      'avg' : IDL.Nat64,
      'max' : IDL.Nat64,
      'min' : IDL.Nat64,
      'first' : IDL.Nat64,
      'last' : IDL.Nat64,
    });
    const DailyMetricsData = IDL.Record({
      'updateCalls' : IDL.Nat64,
      'canisterHeapMemorySize' : NumericEntity,
      'canisterCycles' : NumericEntity,
      'canisterMemorySize' : NumericEntity,
      'timeMillis' : IDL.Int,
    });
    const CanisterMetricsData = IDL.Variant({
      'hourly' : IDL.Vec(HourlyMetricsData),
      'daily' : IDL.Vec(DailyMetricsData),
    });
    const CanisterMetrics = IDL.Record({ 'data' : CanisterMetricsData });
    const MetricsResponse = IDL.Record({ 'metrics' : IDL.Opt(CanisterMetrics) });
    const CanisterLogFeature = IDL.Variant({
      'filterMessageByContains' : IDL.Null,
      'filterMessageByRegex' : IDL.Null,
    });
    const CanisterLogMessagesInfo = IDL.Record({
      'features' : IDL.Vec(IDL.Opt(CanisterLogFeature)),
      'lastTimeNanos' : IDL.Opt(Nanos),
      'count' : IDL.Nat32,
      'firstTimeNanos' : IDL.Opt(Nanos),
    });
    const LogMessagesData = IDL.Record({
      'timeNanos' : Nanos,
      'message' : IDL.Text,
    });
    const CanisterLogMessages = IDL.Record({
      'data' : IDL.Vec(LogMessagesData),
      'lastAnalyzedMessageTimeNanos' : IDL.Opt(Nanos),
    });
    const CanisterLogResponse = IDL.Variant({
      'messagesInfo' : CanisterLogMessagesInfo,
      'messages' : CanisterLogMessages,
    });
    const GetInformationResponse = IDL.Record({
      'status' : IDL.Opt(StatusResponse),
      'metrics' : IDL.Opt(MetricsResponse),
      'logs' : IDL.Opt(CanisterLogResponse),
      'version' : IDL.Opt(IDL.Nat),
    });
    const UserId = IDL.Principal;
    const CollectionCreatorData = IDL.Record({
      'bio' : IDL.Text,
      'userName' : IDL.Text,
      'userId' : UserId,
      'time' : Time,
      'avatar' : Img__1,
    });
    const CollectionInfo__1 = IDL.Record({
      'url' : IDL.Opt(IDL.Text),
      'creator' : UserId,
      'featured' : IDL.Opt(Img__1),
      'logo' : IDL.Opt(Img__1),
      'name' : IDL.Text,
      'banner' : IDL.Opt(Img__1),
      'description' : IDL.Opt(IDL.Text),
      'links' : IDL.Opt(Links),
      'isVisible' : IDL.Bool,
      'royalties' : Royality,
      'category' : IDL.Opt(Category),
      'standard' : Standard,
      'releaseTime' : IDL.Opt(Time),
      'canisterId' : IDL.Principal,
    });
    const Listings = IDL.Record({
      'tokenIdentifier' : TokenIdentifier__3,
      'price' : Price__3,
    });
    const CollectionStatsImmut = IDL.Record({
      'listings' : IDL.Vec(Listings),
      'tradeCount' : IDL.Nat,
      'createTime' : Time,
      'floorPrice' : Price__2,
      'volumeTrade' : Price__2,
    });
    const CollectionData = IDL.Record({
      'creator' : IDL.Opt(CollectionCreatorData),
      'info' : CollectionInfo__1,
      'stats' : IDL.Opt(CollectionStatsImmut),
    });
    const DealPrice = IDL.Record({ 'token' : TokenSpec, 'price' : IDL.Nat64 });
    const TokenSettlement = IDL.Record({
      'to' : IDL.Principal,
      'token' : TokenSpec__3,
      'to_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'from_subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
      'caller' : IDL.Principal,
      'amount' : IDL.Nat,
    });
    const PointSettlement = IDL.Record({
      'user' : User__2,
      'amount' : IDL.Nat64,
    });
    const AccountIdentifier__2 = IDL.Text;
    const RecordEventType = IDL.Variant({
      'auctionDeal' : IDL.Null,
      'dutchAuction' : IDL.Null,
      'offer' : IDL.Null,
      'list' : IDL.Null,
      'claim' : IDL.Null,
      'mint' : IDL.Null,
      'sold' : IDL.Null,
      'acceptOffer' : IDL.Null,
      'point' : IDL.Null,
      'auction' : IDL.Null,
      'transfer' : IDL.Null,
    });
    const RecordSettlement = IDL.Record({
      'to' : IDL.Opt(IDL.Principal),
      'height' : IDL.Nat64,
      'toAID' : IDL.Opt(AccountIdentifier__2),
      'collection' : IDL.Principal,
      'date' : IDL.Int,
      'from' : IDL.Opt(IDL.Principal),
      'item' : TokenIdentifier__2,
      'memo' : IDL.Nat64,
      'fromAID' : IDL.Opt(AccountIdentifier__2),
      'tokenSymbol' : IDL.Opt(IDL.Text),
      'price' : IDL.Opt(Price__2),
      'eventType' : RecordEventType,
    });
    const Settlement = IDL.Variant({
      'token' : TokenSettlement,
      'point' : PointSettlement,
      'record' : RecordSettlement,
    });
    const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : CollectionErr });
    const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
    const CollectionFilterArgs = IDL.Record({
      'creator' : IDL.Opt(IDL.Vec(UserId)),
      'name' : IDL.Opt(IDL.Text),
      'category' : IDL.Opt(IDL.Vec(IDL.Text)),
    });
    const CollectionSortingField = IDL.Variant({
      'listingNumber' : IDL.Null,
      'name' : IDL.Null,
      'createTime' : IDL.Null,
      'floorPrice' : IDL.Null,
      'volumeTrade' : IDL.Null,
    });
    const CollectionSortFilterArgs = IDL.Record({
      'filterArgs' : CollectionFilterArgs,
      'offset' : IDL.Nat,
      'limit' : IDL.Nat,
      'ascending' : IDL.Bool,
      'sortingField' : CollectionSortingField,
    });
    const CreatorInfo = IDL.Record({
      'userName' : IDL.Text,
      'user' : UserId__1,
      'canister' : IDL.Principal,
    });
    const NewOffer = IDL.Record({
      'ttl' : IDL.Int,
      'token' : TokenSpec__2,
      'tokenIdentifier' : TokenIdentifier__1,
      'seller' : User__1,
      'price' : Price__1,
      'bidder' : IDL.Principal,
    });
    const OfferResult = IDL.Variant({ 'ok' : OfferId__1, 'err' : Err__1 });
    const CollectionInfo = IDL.Record({
      'url' : IDL.Opt(IDL.Text),
      'creator' : UserId,
      'featured' : IDL.Opt(Img__1),
      'logo' : IDL.Opt(Img__1),
      'name' : IDL.Text,
      'banner' : IDL.Opt(Img__1),
      'description' : IDL.Opt(IDL.Text),
      'links' : IDL.Opt(Links),
      'isVisible' : IDL.Bool,
      'royalties' : Royality,
      'category' : IDL.Opt(Category),
      'standard' : Standard,
      'releaseTime' : IDL.Opt(Time),
      'canisterId' : IDL.Principal,
    });
    const NFTInfo = IDL.Record({
      'listing' : Listing,
      'lastPrice' : Price__2,
      'listTime' : IDL.Opt(Time),
      'views' : IDL.Nat,
      'favoriters' : IDL.Vec(IDL.Principal),
    });
    const PageParam = IDL.Record({ 'page' : IDL.Nat, 'pageCount' : IDL.Nat });
    const NewDutchAuction = IDL.Record({
      'startTime' : Time,
      'token' : TokenSpec__2,
      'tokenIdentifier' : TokenIdentifier__1,
      'reduceTime' : IDL.Nat64,
      'endTime' : Time,
      'floorPrice' : Price__1,
      'reducePrice' : Price__1,
      'payee' : IDL.Opt(User__1),
      'startPrice' : Price__1,
    });
    const DutchAuctionResult = IDL.Variant({ 'ok' : IDL.Null, 'err' : Err__1 });
    const ShowCart = IDL.Record({
      'nftUrl' : IDL.Text,
      'tokenIdentifier' : TokenIdentifier,
      'nftName' : IDL.Text,
      'price' : IDL.Nat64,
      'collectionName' : IDL.Text,
    });
    const Img__2 = IDL.Text;
    const CollectMetricsRequestType = IDL.Variant({
      'force' : IDL.Null,
      'normal' : IDL.Null,
    });
    const UpdateInformationRequest = IDL.Record({
      'metrics' : IDL.Opt(CollectMetricsRequestType),
    });
    const VerifyResult = IDL.Variant({ 'ok' : TokenIdentifier, 'err' : Err });
    return IDL.Service({
      'acceptOffer' : IDL.Func([OfferId], [Result_6], []),
      'addCanisterController' : IDL.Func(
          [IDL.Principal, IDL.Principal],
          [],
          ['oneway'],
        ),
      'addCarts' : IDL.Func([IDL.Vec(AddCart)], [IDL.Vec(Result_5)], []),
      'addCreator_whitelist' : IDL.Func([IDL.Vec(IDL.Principal)], [], []),
      'addSecond_creator_whitelist' : IDL.Func([IDL.Vec(IDL.Principal)], [], []),
      'add_import_collection_price' : IDL.Func(
          [TokenSpec, IDL.Nat],
          [],
          ['oneway'],
        ),
      'add_shikuland_owner' : IDL.Func([User], [], ['oneway']),
      'balance' : IDL.Func([], [IDL.Nat], []),
      'batchBuyNow' : IDL.Func(
          [IDL.Vec(TokenIdentifier)],
          [BatchTradeResult],
          [],
        ),
      'batchSell' : IDL.Func([IDL.Vec(NewFixed)], [IDL.Vec(ListResult)], []),
      'batchUpdateProfile' : IDL.Func([IDL.Vec(UserId__1), IDL.Text], [], []),
      'batchVerifyTx2' : IDL.Func(
          [IDL.Vec(IDL.Tuple(IDL.Nat, TokenSpec))],
          [BatchVerifyResult],
          [],
        ),
      'buyNow' : IDL.Func([TokenIdentifier], [TradeResult], []),
      'cancelOffer' : IDL.Func([OfferId], [IDL.Bool], []),
      'checkOffer' : IDL.Func([IDL.Vec(TokenIdentifier)], [], []),
      'checkSubAccountBalance' : IDL.Func(
          [AccountIdentifier__1, TokenSpec],
          [IDL.Nat64],
          [],
        ),
      'checkTx' : IDL.Func([IDL.Vec(TokenIdentifier)], [], []),
      'collectionStats' : IDL.Func(
          [IDL.Principal],
          [
            IDL.Opt(
              IDL.Record({
                'listings' : IDL.Vec(StatsListings),
                'tradeCount' : IDL.Nat,
                'createTime' : Time,
                'floorPrice' : Price,
                'volumeTrade' : Price,
              })
            ),
          ],
          ['query'],
        ),
      'createCollection' : IDL.Func([CollectionInit], [Result_4], []),
      'createProfile' : IDL.Func([NewProfile], [Result_3], []),
      'createProfile4User' : IDL.Func(
          [IDL.Principal, NewProfile],
          [Result_3],
          [],
        ),
      'created' : IDL.Func([TokenIdentifier, IDL.Principal], [], []),
      'dealOffer' : IDL.Func([IDL.Vec(TokenIdentifier)], [], []),
      'delCreator_whitelist' : IDL.Func([IDL.Vec(IDL.Principal)], [], []),
      'delSecond_creator_whitelist' : IDL.Func([IDL.Vec(IDL.Principal)], [], []),
      'del_import_collection_price' : IDL.Func([TokenSpec], [], ['oneway']),
      'deleteCanister' : IDL.Func([IDL.Principal], [], []),
      'deleteWait' : IDL.Func([TokenIdentifier], [], []),
      'deleteWaitByHeight' : IDL.Func([IDL.Nat], [], []),
      'favorite' : IDL.Func([TokenIdentifier], [], []),
      'findHighOfferByNft' : IDL.Func([TokenIdentifier], [IDL.Opt(Offer)], []),
      'findOfferById' : IDL.Func([OfferId], [IDL.Opt(Offer)], []),
      'findOfferByNft' : IDL.Func([TokenIdentifier], [IDL.Vec(Offer)], ['query']),
      'findProfile' : IDL.Func([], [Result_2], ['query']),
      'findProfileWho' : IDL.Func([User__2], [Result_2], ['query']),
      'flushPriceOfAuction' : IDL.Func([], [], []),
      'follow' : IDL.Func([IDL.Principal], [], []),
      'getBatchListingByTid' : IDL.Func([IDL.Nat], [IDL.Vec(Listing)], []),
      'getCanisterSettings' : IDL.Func(
          [IDL.Principal],
          [definite_canister_settings],
          [],
        ),
      'getCanistergeekInformation' : IDL.Func(
          [GetInformationRequest],
          [GetInformationResponse],
          ['query'],
        ),
      'getCollectionData' : IDL.Func(
          [IDL.Principal],
          [IDL.Opt(CollectionData)],
          ['query'],
        ),
      'getCollectionDatas' : IDL.Func(
          [IDL.Vec(IDL.Principal)],
          [IDL.Vec(CollectionData)],
          ['query'],
        ),
      'getConfig' : IDL.Func(
          [],
          [
            IDL.Record({
              'platformFeeAccount' : IDL.Principal,
              'owner' : IDL.Principal,
              'lanuchpad' : IDL.Principal,
              'block' : IDL.Text,
              'ledeger' : IDL.Text,
              'point' : IDL.Principal,
              'record' : IDL.Principal,
            }),
          ],
          ['query'],
        ),
      'getCreator_whitelist' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
      'getListingByHeight' : IDL.Func(
          [IDL.Nat64, TokenSpec],
          [IDL.Opt(Listing)],
          [],
        ),
      'getListingByTid' : IDL.Func([IDL.Nat], [IDL.Opt(Listing)], []),
      'getOfferTids' : IDL.Func([], [IDL.Vec(TokenIdentifier)], ['query']),
      'getOwner' : IDL.Func([], [IDL.Principal], []),
      'getPayAddress' : IDL.Func([], [IDL.Text], []),
      'getPayAddressWho' : IDL.Func([IDL.Principal], [IDL.Text], ['query']),
      'getPriceOfAuction' : IDL.Func(
          [TokenIdentifier],
          [IDL.Opt(DealPrice)],
          ['query'],
        ),
      'getSecond_creator_whitelist' : IDL.Func(
          [],
          [IDL.Vec(IDL.Principal)],
          ['query'],
        ),
      'getSettlement' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(Settlement, IDL.Nat))],
          ['query'],
        ),
      'get_import_collection_price' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(TokenSpec, IDL.Nat))],
          ['query'],
        ),
      'get_shikuland_owers' : IDL.Func([], [IDL.Vec(User)], ['query']),
      'getrecordMarks' : IDL.Func(
          [],
          [
            IDL.Vec(
              IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat)))
            ),
          ],
          ['query'],
        ),
      'getrecordMarksByCanister' : IDL.Func(
          [IDL.Principal],
          [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
          ['query'],
        ),
      'handleOrigynActivity' : IDL.Func(
          [IDL.Principal, IDL.Vec(IDL.Text)],
          [],
          [],
        ),
      'icrc1_balance' : IDL.Func([IDL.Principal, IDL.Text], [IDL.Nat], []),
      'importCollection' : IDL.Func(
          [IDL.Principal, IDL.Text, CollectionInit],
          [Result],
          [],
        ),
      'importCollectionWithToken' : IDL.Func(
          [
            CollectionInit,
            TokenSpec,
            IDL.Opt(IDL.Principal),
            IDL.Opt(IDL.Principal),
          ],
          [Result_1],
          [],
        ),
      'listCollected' : IDL.Func([], [IDL.Vec(TokenIdentifier)], ['query']),
      'listCollections' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
      'listCollections2' : IDL.Func(
          [IDL.Opt(CollectionSortFilterArgs)],
          [IDL.Vec(CollectionData)],
          ['query'],
        ),
      'listCreated' : IDL.Func([], [IDL.Vec(TokenIdentifier)], ['query']),
      'listCreators' : IDL.Func([], [IDL.Vec(CreatorInfo)], []),
      'listFavorite' : IDL.Func([], [IDL.Vec(TokenIdentifier)], ['query']),
      'listOfferMade' : IDL.Func([IDL.Principal], [IDL.Vec(Offer)], []),
      'listOfferReceived' : IDL.Func([IDL.Principal], [IDL.Vec(Offer)], []),
      'listOrigynCollections' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
      'listProfile' : IDL.Func(
          [],
          [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text, IDL.Text))],
          ['query'],
        ),
      'listfolloweds' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
      'listfollowers' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
      'makeOffer' : IDL.Func([NewOffer], [OfferResult], []),
      'migrateCollection' : IDL.Func([], [], []),
      'migrateListing' : IDL.Func([], [], []),
      'myCollectionList' : IDL.Func([], [IDL.Vec(CollectionInfo)], ['query']),
      'nftInfo' : IDL.Func([TokenIdentifier], [NFTInfo], ['query']),
      'nftInfos' : IDL.Func(
          [IDL.Vec(TokenIdentifier)],
          [IDL.Vec(NFTInfo)],
          ['query'],
        ),
      'nftInfosByCollection' : IDL.Func(
          [IDL.Principal, IDL.Vec(IDL.Nat32)],
          [IDL.Vec(NFTInfo)],
          ['query'],
        ),
      'nftInfosByCollectionOgy' : IDL.Func(
          [IDL.Principal, IDL.Vec(IDL.Text)],
          [IDL.Vec(NFTInfo)],
          [],
        ),
      'nftInfosByCollectionPageable' : IDL.Func(
          [IDL.Principal, PageParam],
          [IDL.Vec(NFTInfo)],
          ['query'],
        ),
      'pageListProfile' : IDL.Func(
          [PageParam],
          [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text, IDL.Text, IDL.Text, IDL.Int))],
          ['query'],
        ),
      'profileCount' : IDL.Func([], [IDL.Nat], ['query']),
      'queryPlatformFee' : IDL.Func(
          [],
          [
            IDL.Record({
              'fee' : Price,
              'precision' : IDL.Nat64,
              'account' : AccountIdentifier__1,
            }),
          ],
          ['query'],
        ),
      'queryPointRatio' : IDL.Func([], [IDL.Nat64], ['query']),
      'querySortedCollection' : IDL.Func(
          [
            CollectionSortingField,
            IDL.Bool,
            IDL.Nat,
            IDL.Nat,
            CollectionFilterArgs,
          ],
          [IDL.Vec(IDL.Principal)],
          [],
        ),
      'rejectOffer' : IDL.Func([OfferId], [Result_1], []),
      'rejectOfferByUser' : IDL.Func([OfferId], [Result_1], []),
      'removeCarts' : IDL.Func([IDL.Opt(TokenIdentifier)], [], []),
      'removeCollection' : IDL.Func([IDL.Principal, IDL.Text], [Result], []),
      'reset_shikuland_owner' : IDL.Func([], [], []),
      'sell' : IDL.Func([NewFixed], [ListResult], []),
      'sellDutchAuction' : IDL.Func([NewDutchAuction], [DutchAuctionResult], []),
      'setEntrepotCreator' : IDL.Func(
          [IDL.Principal, AccountIdentifier__1],
          [],
          ['oneway'],
        ),
      'setMinter' : IDL.Func([IDL.Principal, IDL.Text], [], []),
      'setOwner' : IDL.Func([IDL.Principal], [], []),
      'setPlatformAccount' : IDL.Func([IDL.Principal], [], []),
      'setPlatformFee' : IDL.Func([IDL.Nat64, IDL.Nat64], [], []),
      'setPointRatio' : IDL.Func([IDL.Nat64], [], []),
      'setPriceOfAuction' : IDL.Func([TokenIdentifier, DealPrice], [], []),
      'setRateLimit' : IDL.Func([IDL.Nat, IDL.Nat], [], []),
      'setRateLimitFalse' : IDL.Func([], [], []),
      'showCart' : IDL.Func([], [IDL.Vec(ShowCart)], []),
      'subscribe' : IDL.Func([IDL.Text], [], []),
      'unSell' : IDL.Func([TokenIdentifier], [ListResult], []),
      'unfavorite' : IDL.Func([TokenIdentifier], [], []),
      'unfollow' : IDL.Func([IDL.Principal], [], []),
      'updateAvatar' : IDL.Func([IDL.Principal, Img__2], [IDL.Bool], []),
      'updateCanistergeekInformation' : IDL.Func(
          [UpdateInformationRequest],
          [],
          [],
        ),
      'updateCollection' : IDL.Func([CollectionInfo], [IDL.Bool], []),
      'updateCreators' : IDL.Func([], [IDL.Text], []),
      'updateOffer' : IDL.Func([OfferId, Price], [OfferResult], []),
      'updateProfile' : IDL.Func([NewProfile], [IDL.Bool], []),
      'verifyTxWithMemo2' : IDL.Func([IDL.Nat, TokenSpec], [VerifyResult], []),
      'view' : IDL.Func([TokenIdentifier], [], []),
      'volumeTraded' : IDL.Func([IDL.Principal, Price], [], []),
      'wallet_receive' : IDL.Func([], [IDL.Nat], []),
      'withdraw' : IDL.Func(
          [AccountIdentifier__1, Price, IDL.Nat64, TokenSpec],
          [IDL.Bool],
          [],
        ),
      'withdrawByAdmin' : IDL.Func(
          [IDL.Principal, Price, TokenSpec],
          [IDL.Bool],
          [],
        ),
      'withdrawBySubAccount' : IDL.Func([User, Price, TokenSpec], [IDL.Bool], []),
    });
  };
  module.exports = { idlFactory };